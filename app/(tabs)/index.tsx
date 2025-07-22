import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Calendar1Icon,
  ClockIcon,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react-native";
import React, { useEffect, useState } from 'react';
import { ScrollView } from "react-native";

export default function SummaryScreen() {
  const [weekSummary, setWeekSummary] = useState({
    totalHours: 0,
    totalMinutes: 0,
    activeDays: 0,
    avgPerDay: 0,
  });

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const prev = await AsyncStorage.getItem('entries');
        const entries = prev ? JSON.parse(prev) : [];
        // Get current week dates
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        startOfWeek.setHours(0,0,0,0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23,59,59,999);

        // Filter entries in week
        interface Entry {
          date: string;
          hour: number;
          minute: number;
        }

        const weekEntries = (entries as Entry[]).filter((e: Entry) => {
          if (!e.date) return false;
          const d = new Date(e.date);
          return d >= startOfWeek && d <= endOfWeek;
        });

        // Group entries by day (only days with at least one entry)
        const daySet = new Set();
        let totalMinutes = 0;
        weekEntries.forEach(e => {
          const day = e.date.slice(0,10);
          daySet.add(day);
          totalMinutes += e.hour * 60 + e.minute;
        });
        const activeDays = daySet.size;
        const avgPerDay = activeDays ? (totalMinutes / 60) / activeDays : 0;
        setWeekSummary({
          totalHours: Math.floor(totalMinutes / 60),
          totalMinutes: totalMinutes % 60,
          activeDays,
          avgPerDay,
        });
      } catch {
        setWeekSummary({ totalHours: 0, totalMinutes: 0, activeDays: 0, avgPerDay: 0 });
      }
    };
    fetchEntries();
  }, []);

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
                  time={`${weekSummary.totalHours}h ${weekSummary.totalMinutes}m`}
                  icon={ClockIcon}
                  color="#8637CF"
                />
                <SummaryCard
                  title="Días Activos"
                  time={`${weekSummary.activeDays}`}
                  icon={Calendar1Icon}
                  color="#8637CF"
                />
                <SummaryCard
                  title="Promedio/Día"
                  time={weekSummary.avgPerDay ? `${weekSummary.avgPerDay.toFixed(1)}h` : "0h"}
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
