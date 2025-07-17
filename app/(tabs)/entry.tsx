import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Clock } from "lucide-react-native";
import { ScrollView } from "react-native";

export default function EntryScreen() {

  return (
    <Box className="gap-6">
      <Box className="bg-white dark:bg-black p-4">
        <Center>
          <Icon as={Clock} className="m-2 w-12 h-12" color="#8637CF"/>
          <Heading size="md" className="mb-1">
            Registro de Tiempo
          </Heading>
          <Text size="sm">Registra tus horas de trabajo</Text>
        </Center>
      </Box>
      <ScrollView>
   
      </ScrollView>
    </Box>
  );
}

