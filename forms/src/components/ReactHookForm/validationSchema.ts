import * as yup from 'yup';
import YupPassword from 'yup-password';
import { countryNames } from '../utils/formData.ts';

YupPassword(yup);

const MAX_FILE_SIZE = 1000000;
const fileExtensions = ['image/jpeg', 'image/png'];

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .test('firstUpperCasedLetter', 'First letter must be uppercase', (value) =>
      /^[A-ZА-ЯЁ]/.test(value)
    ),
  age: yup.number().nullable().min(1).required('Age is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .password()
    .min(0)
    .minNumbers(1, '1 number')
    .minLowercase(1, '1 lowercase letter')
    .minUppercase(1, '1 uppercase letter')
    .minSymbols(1, '1 special character')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Must match with password')
    .required(),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Select male or female')
    .required('Gender is required'),
  country: yup
    .string()
    .required()
    .oneOf(countryNames, 'select a country from the list'),
  image: yup
    .mixed<File>()
    .required()
    .test('fileSize', 'File is too large', (file) => {
      let checkedFile = file;
      if (file.constructor.name === 'FileList') {
        const checkedFileList = file as unknown as FileList;
        if (checkedFileList.length > 0) {
          checkedFile = checkedFileList[0];
        }
      }
      return checkedFile.size <= MAX_FILE_SIZE;
    })
    .test('fileType', 'Unsupported file type', (file: File) => {
      let checkedFile = file;
      if (file.constructor.name === 'FileList') {
        const checkedFileList = file as unknown as FileList;
        if (checkedFileList.length > 0) {
          checkedFile = checkedFileList[0];
        }
      }
      return fileExtensions.includes(checkedFile.type);
    }),
  acceptTerms: yup.boolean().isTrue().required(),
});
