import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  Calendar1Icon,
  ClockIcon,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react-native";
import { ScrollView } from "react-native";

export default function SummaryScreen() {
  return (
    <Box className="gap-6" >
      <Box className="bg-white dark:bg-black p-4">
        <Center>
          <Icon as={LayoutDashboard} className="m-2 w-12 h-12" color="#8637CF"/>
          <Heading size="md" className="mb-1">
            Resumen
          </Heading>
          <Text size="sm">Tu panorama de seguimiento de tiempo</Text>
        </Center>
      </Box>

      <ScrollView>
        <Card size="lg" variant="filled" className="bg-white dark:bg-black p-4">
          <VStack>
            <Center>
              <Heading size="xl" className="mb-4">
                Resumen de Esta Semana
              </Heading>
            </Center>

            <Center>
              <HStack className="gap-4">
                <SummaryCard
                  title="Horas Totales"
                  time="46.1"
                  icon={ClockIcon}
                  color="#8637CF"
                />
                <SummaryCard
                  title="Días Activos"
                  time="7"
                  icon={Calendar1Icon}
                  color="#8637CF"
                />
                <SummaryCard
                  title="Promedio/Día"
                  time="6.6"
                  icon={TrendingUp}
                  color="#8637CF"
                />
              </HStack>
            </Center>
          </VStack>
        </Card>
        
      </ScrollView>
    </Box>
  );
}

type SummaryCardProps = {
  title: string;
  time: string;
  icon?: React.ComponentType<any>;
  color?: string;
};

const SummaryCard = ({ title, time, icon, color }: SummaryCardProps) => {
  return (
    <Card size="lg" variant="filled">
      <Center>
        <Icon as={icon} color={color} className="m-2 w-8 h-8" />
        <Heading size="xl" className="mb-1">
          {time}
        </Heading>
        <Text size="sm">{title}</Text>
      </Center>
    </Card>
  );
};
