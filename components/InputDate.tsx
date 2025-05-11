import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

type InputDateProps = Omit<
  React.ComponentProps<typeof DateTimePicker>,
  "value"
> & {
  date: Date;
  setDate: (date: Date) => void;
};

export function InputDate({
  date,
  setDate,
  minimumDate = new Date(),
}: InputDateProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.button}
      >
        <Ionicons
          name="calendar"
          size={24}
          color="white"
          style={styles.calendarIcon}
        />
        <Text style={styles.text}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          minimumDate={minimumDate}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#123AAA",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  calendarIcon: {
    marginRight: 10,
  },
});
