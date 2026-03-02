import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

export default function HomeScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Format số điện thoại
  const formatPhone = (text) => {
    const onlyNumber = text.replace(/[^0-9]/g, '');

    if (onlyNumber.length <= 3) return onlyNumber;

    if (onlyNumber.length <= 6)
      return onlyNumber.slice(0, 3) + ' ' + onlyNumber.slice(3);

    if (onlyNumber.length <= 8)
      return (
        onlyNumber.slice(0, 3) +
        ' ' +
        onlyNumber.slice(3, 6) +
        ' ' +
        onlyNumber.slice(6)
      );

    return (
      onlyNumber.slice(0, 3) +
      ' ' +
      onlyNumber.slice(3, 6) +
      ' ' +
      onlyNumber.slice(6, 8) +
      ' ' +
      onlyNumber.slice(8, 10)
    );
  };

  // Validate số điện thoại VN (10 số, bắt đầu bằng 0)
  const validatePhone = (value) => {
    const raw = value.replace(/\s/g, '');
    const regex = /^0[0-9]{9}$/;
    return regex.test(raw);
  };

  const handleChange = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    if (!validatePhone(formatted)) {
      setError('Số điện thoại không đúng định dạng');
    } else {
      setError('');
    }
  };

  const handleContinue = () => {
    if (!validatePhone(phone)) {
      Alert.alert(
        'Lỗi',
        'Số điện thoại không đúng định dạng. Vui lòng nhập lại'
      );
      return;
    }

    Alert.alert('Thành công', 'Số điện thoại hợp lệ!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>

      <TextInput
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={handleChange}
        maxLength={13}
        style={[
          styles.input,
          error ? styles.inputError : null
        ]}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          error ? styles.buttonDisabled : null
        ]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginTop: 5
  },
  button: {
    backgroundColor: '#1E3AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#999'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});