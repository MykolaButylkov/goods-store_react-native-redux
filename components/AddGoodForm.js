import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker
} from 'react-native';
import { Formik } from 'formik';
import { categories } from './Categories';
import * as yup from 'yup';


const AddGoodForm = ({ isVisible, onClose, onSubmit }) => {
  const newGoodSchema = yup.object().shape({
    selectedCategory: yup.string().required('Category is required'),
    title: yup.string().trim().required('Title is required'),
    image: yup.string().trim().required('URL image is required').url('Invalid URL format').nullable(),
    price: yup
      .number()
      .typeError('Only numeric values are allowed')
      .required('Price is required')
      .positive('Price must be positive')
      .integer('Price must be an integer'),
    description: yup.string().trim().required('Description is required'),
  });

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Good</Text>
        <Formik
          initialValues={{
            selectedCategory: '',
            title: '',
            image: '',
            price: '',
            description: '',
          }}
          onSubmit={async (values, { resetForm }) => {
            const newGood = {
              id: Date.now(),
              category: values.selectedCategory,
              ...values,
              rating: { count: 1, rate: 0 },
            };

            await newGoodSchema.validate(newGood, { abortEarly: false });
            onSubmit(newGood);
            resetForm();
            onClose();
          }}
          validationSchema={newGoodSchema} 
        >
          {(formikProps) => (
            <View>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={formikProps.values.selectedCategory}
                  style={styles.picker}
                  onValueChange={formikProps.handleChange('selectedCategory')}
                >
                  <Picker.Item label="Please pick the category" value="" />
                  {categories.map((category) => (
                    <Picker.Item
                      key={category.value}
                      label={category.text}
                      value={category.value}
                    />
                  ))}
                </Picker>
                {formikProps.touched.selectedCategory && formikProps.errors.selectedCategory ? (
                  <Text style={styles.errorText}>{formikProps.errors.selectedCategory}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  onChangeText={formikProps.handleChange('title')}
                  value={formikProps.values.title}
                />
                {formikProps.touched.title && formikProps.errors.title ? (
                  <Text style={styles.errorText}>{formikProps.errors.title}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Image URL"
                  onChangeText={formikProps.handleChange('image')}
                  value={formikProps.values.image}
                />
                {formikProps.touched.image && formikProps.errors.image ? (
                  <Text style={styles.errorText}>{formikProps.errors.image}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  onChangeText={formikProps.handleChange('price')}
                  value={formikProps.values.price.trim()}
                  keyboardType="numeric"
                />
                {formikProps.touched.price && formikProps.errors.price ? (
                  <Text style={styles.errorText}>{formikProps.errors.price}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Description"
                  onChangeText={formikProps.handleChange('description')}
                  value={formikProps.values.description}
                  multiline
                />
                {formikProps.touched.description && formikProps.errors.description ? (
                  <Text style={styles.errorText}>{formikProps.errors.description}</Text>
                ) : null}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={formikProps.handleSubmit}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    display: 'inline-block',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 12,
    padding: 4,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 4,
    marginBottom: 12,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
  },
  addButton: {
    backgroundColor: '#ff5733',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    position: 'absolute', 
    color: 'red',
    fontSize: 12,
    backgroundColor: '#fff',
    bottom: 2,
  },
});

export default AddGoodForm;
