import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { CircleChevronLeft, CircleUser, Edit, MailIcon, SaveIcon, User } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView } from "react-native";


export default function TabTwoScreen() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
  });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleStartEditing = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setEditing(false);
  };

  const handleSaveEditing = () => {
    setUser({ name: editName, email: editEmail });
    setEditing(false);
  };

  return (
    <Box className="gap-6">
      <Box className="bg-white dark:bg-black p-4">
        <Center>
          <Icon as={CircleUser} className="m-2 w-12 h-12" color="#8637CF"/>
          <Heading size="md" className="mb-1">
            Mi Perfil
          </Heading>
          <Text size="sm">Gestiona tu información personal</Text>
        </Center>
      </Box>
      <ScrollView>
        <Card size="lg" variant="filled" className="bg-white dark:bg-black p-4">
          <VStack space="md">
            <HStack className="mb-4 justify-between">
            <Heading size="lg" className="mb-4">
              Información del Usuario
            </Heading>
            {editing ? (
              <HStack space="md">
                <Pressable onPress={handleCancelEditing}>
                  <Icon as={CircleChevronLeft} className="w-6 h-6" />
                </Pressable>
                <Pressable onPress={handleSaveEditing}>
                  <Icon as={SaveIcon} className="w-6 h-6" color="blue" />
                </Pressable>
              </HStack>
            ) : (
              <Pressable onPress={handleStartEditing}>
                <LinearGradient
                  className="rounded-full items-center py-2 px-4"
                  colors={["#8637CF", "#0F55A1"]}
                  start={[0, 1]}
                  end={[1, 0]}
                >
                  <HStack className="items-center gap-2">
                    <Icon as={Edit} className="w-6 h-6" color="white" />
                    <Text className="text-white font-semibold">Editar</Text>
                  </HStack>
                </LinearGradient>
              </Pressable>
            )}
          </HStack>
          <HStack className="items-center">
            <Box className="rounded-full bg-blue-100 dark:bg-black p-4 mr-4">
              <Icon as={User} className="w-6 h-6" />
            </Box>
            <VStack>
              <Heading size="sm"> Nombre Completo:</Heading>
              {editing ? (
                <Input className="min-w-[250px]">
                  <InputField value={editName} type="text" onChangeText={setEditName} />
                </Input>
              ) : (
                <Text size="md"> {user.name}</Text>
              )}
            </VStack>
          </HStack>
          <HStack className="items-center">
            <Box className="rounded-full bg-blue-100 dark:bg-black p-4 mr-4">
              <Icon as={MailIcon} className="w-6 h-6" />
            </Box>
            <VStack>
              <Heading size="sm"> Correo Electrónico:</Heading>
              {editing ? (
                <Input className="min-w-[250px]">
                  <InputField value={editEmail} type="text" onChangeText={setEditEmail}/>
                </Input>
              ) : (
                <Text size="md"> {user.email}</Text>
              )}
            </VStack>
          </HStack>
          </VStack>
        </Card>
      </ScrollView>
    </Box>
  );
}
