import { FC } from 'react';
import { Link } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validationSchema.ts';
import { countryNames } from '../utils/formData.ts';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: 'male' | 'female';
  image: File;
  country: string;
  acceptTerms: true;
}

const ReactHookForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">Password Confirm</label>
        <input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select gender</option>
          <option key={'male'} value={'male'}>
            {'male'}
          </option>
          <option key={'female'} value={'female'}>
            {'female'}
          </option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country" {...register('country')}>
          <option value="">Select country</option>
          {countryNames.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" {...register('image')} />
        {errors.image && <p>{errors.image.message}</p>}
      </div>
      <div>
        <label htmlFor="acceptTerms">Accept Terms and Conditions</label>
        <input type="checkbox" id="acceptTerms" {...register('acceptTerms')} />
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>
      <Link to="/"> Cancel </Link>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookForm;
