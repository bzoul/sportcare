import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

const widthScreen = Dimensions.get('window').width;

interface IProps {
  defaultDate: Date;
  onChangeProps: Function;
}

export default ({defaultDate, onChangeProps}: IProps) => {
  const [date, setDate] = useState<Date>(defaultDate);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={dayjs(date.toISOString()).format('DD/MM/YYYY')}
        keyboardType="default"
        placeholderTextColor="grey"
        onFocus={() => setOpen(true)}
      />
      <DatePicker
        confirmText="Confirmer"
        cancelText="Annuler"
        title={'Choisir une date'}
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={newDate => {
          setOpen(false);
          setDate(newDate);
          onChangeProps(newDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: (widthScreen * 40) / 100,
    height: 35,
    color: 'black',
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
