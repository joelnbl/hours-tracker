import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertCircleIcon, Clock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

function Entry() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editHour, setEditHour] = useState("");
  const [editMinute, setEditMinute] = useState("");
  const [entries, setEntries] = useState<{ hour: number; minute: number; date: string }[]>([]);

  // Load entries on mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const prev = await AsyncStorage.getItem('entries');
        setEntries(prev ? JSON.parse(prev) : []);
      } catch {
        // ignore
      }
    };
    loadEntries();
  }, []);

  // Add entry and reload
  const handleSubmit = async () => {
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (isNaN(h) || isNaN(m) || h < 0 || m < 0 || m > 59) {
      setIsInvalid(true);
      return;
    }
    // Validate total hours for today
    try {
      const prev = await AsyncStorage.getItem('entries');
      const newEntries = prev ? JSON.parse(prev) : [];
      const today = new Date().toISOString().slice(0, 10);
      const todaysEntries = newEntries.filter((e: { hour: number; minute: number; date: string }) => e.date && e.date.slice(0, 10) === today);
      const todaysMinutes = todaysEntries.reduce((sum: number, e: { hour: number; minute: number; date: string }) => sum + (e.hour * 60 + e.minute), 0);
      const newMinutes = h * 60 + m;
      if ((todaysMinutes + newMinutes) > 24 * 60) {
        setIsInvalid(true);
        return;
      }
      setIsInvalid(false);
      newEntries.push({ hour: h, minute: m, date: new Date().toISOString() });
      await AsyncStorage.setItem('entries', JSON.stringify(newEntries));
      setHour("");
      setMinute("");
      setEntries(newEntries);
    } catch {
      // ignore
    }
  };

  // Edit entry
  const handleEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditHour(todaysEntries[idx].hour.toString());
    setEditMinute(todaysEntries[idx].minute.toString());
  };

  const handleEditSave = async () => {
    if (editingIdx === null) return;
    const h = parseInt(editHour, 10);
    const m = parseInt(editMinute, 10);
    if (isNaN(h) || isNaN(m) || h < 0 || m < 0 || m > 59) {
      setIsInvalid(true);
      return;
    }
    // Validate total hours for today (excluding the entry being edited)
    const prev = await AsyncStorage.getItem('entries');
    const allEntries = prev ? JSON.parse(prev) : [];
    const today = new Date().toISOString().slice(0, 10);
    let todaysMinutes = 0;
    let entryIdxInAll = -1;
    let count = 0;
    for (let i = 0; i < allEntries.length; i++) {
      if (allEntries[i].date && allEntries[i].date.slice(0, 10) === today) {
        if (count === editingIdx) {
          entryIdxInAll = i;
          count++;
          continue;
        }
        todaysMinutes += allEntries[i].hour * 60 + allEntries[i].minute;
        count++;
      }
    }
    const newMinutes = h * 60 + m;
    if ((todaysMinutes + newMinutes) > 24 * 60) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    if (entryIdxInAll !== -1) {
      allEntries[entryIdxInAll].hour = h;
      allEntries[entryIdxInAll].minute = m;
      await AsyncStorage.setItem('entries', JSON.stringify(allEntries));
      setEntries(allEntries);
      setEditingIdx(null);
    }
  };

  // Delete entry
  const handleDelete = async (idx: number) => {
    const prev = await AsyncStorage.getItem('entries');
    const allEntries = prev ? JSON.parse(prev) : [];
    const today = new Date().toISOString().slice(0, 10);
    let entryIdxInAll = -1;
    let count = 0;
    for (let i = 0; i < allEntries.length; i++) {
      if (allEntries[i].date && allEntries[i].date.slice(0, 10) === today) {
        if (count === idx) {
          entryIdxInAll = i;
          break;
        }
        count++;
      }
    }
    if (entryIdxInAll !== -1) {
      allEntries.splice(entryIdxInAll, 1);
      await AsyncStorage.setItem('entries', JSON.stringify(allEntries));
      setEntries(allEntries);
    }
  };

  // Calculate today's total
  const today = new Date().toISOString().slice(0, 10);
  const todaysEntries = entries.filter(e => e.date && e.date.slice(0, 10) === today);

  return (
    <Box className="gap-6 flex-1 bg-white dark:bg-black">
      <Box className="p-4 rounded-b-2xl shadow-md bg-white dark:bg-black">
        <Center>
          <Icon as={Clock} className="m-2 w-12 h-12" color="#8637CF"/>
          <Heading size="md" className="mb-1">Registro de Tiempo</Heading>
          <Text size="sm">Registra tus horas de trabajo</Text>
        </Center>
      </Box>
      <ScrollView className="flex-1">
        <VStack className="w-full max-w-[340px] mx-auto rounded-xl border border-background-200 p-6 bg-white dark:bg-black shadow-lg mt-6">
          <Heading size="md" className="mb-4 text-violet-800 dark:text-violet-200">Agregar entrada</Heading>
          <FormControl isInvalid={isInvalid} size="md">
            <HStack className="gap-4 mb-2">
              <Input className="flex-1" size="xl">
                <InputField
                  type="text"
                  placeholder="Hora"
                  value={hour}
                  onChangeText={setHour}
                  keyboardType="numeric"
                />
              </Input>
              <Input className="flex-1" size="xl">
                <InputField
                  type="text"
                  placeholder="Minuto"
                  value={minute}
                  onChangeText={setMinute}
                  keyboardType="numeric"
                />
              </Input>
            </HStack>
            <FormControlHelper>
              <FormControlHelperText>
                Ingresa hora y minuto. Minuto debe ser entre 0 y 59.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Ingresa valores válidos para hora y minuto.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button className="w-full mt-4" size="lg" onPress={handleSubmit}>
            <ButtonText>Guardar</ButtonText>
          </Button>
        </VStack>
        <VStack className="w-full max-w-[340px] mx-auto gap-2 mt-8">
          <Heading size="sm" className="mb-2">Entradas de hoy</Heading>
          {todaysEntries.length === 0 ? (
            <Text className="text-gray-500 dark:text-gray-400">No hay registros para hoy.</Text>
          ) : (
            todaysEntries.map((e, idx) => (
              <Box key={idx} className="flex-row justify-between items-center p-3 rounded-xl bg-violet-50 dark:bg-violet-950 mb-2 shadow">
                {editingIdx === idx ? (
                  <>
                    <Input className="w-16 mr-2" size="sm">
                      <InputField
                        type="text"
                        value={editHour}
                        onChangeText={setEditHour}
                        keyboardType="numeric"
                        placeholder="Hora"
                      />
                    </Input>
                    <Input className="w-16 mr-2" size="sm">
                      <InputField
                        type="text"
                        value={editMinute}
                        onChangeText={setEditMinute}
                        keyboardType="numeric"
                        placeholder="Minuto"
                      />
                    </Input>
                    <Button size="xs" className="mr-2" onPress={handleEditSave}>
                      <ButtonText>Guardar</ButtonText>
                    </Button>
                    <Button size="xs" variant="outline" onPress={() => setEditingIdx(null)}>
                      <ButtonText>Cancelar</ButtonText>
                    </Button>
                  </>
                ) : (
                  <>
                    <Text className="text-violet-800 dark:text-violet-200 font-bold text-lg">{e.hour}h {e.minute}m</Text>
                    <Text className="text-xs text-gray-400 mx-2">{new Date(e.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <Button size="xs" className="mr-2" onPress={() => handleEdit(idx)}>
                      <ButtonText>Editar</ButtonText>
                    </Button>
                    <Button size="xs" variant="outline" onPress={() => handleDelete(idx)}>
                      <ButtonText>Eliminar</ButtonText>
                    </Button>
                  </>
                )}
              </Box>
            ))
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default Entry;

