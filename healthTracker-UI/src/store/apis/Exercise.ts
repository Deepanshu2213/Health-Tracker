import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { exerciseData } from '../../components/ExerciseDetails';
import type { ResponseObj } from '../interfaces/ResponseInterface';

export const ExerciseApi = createApi({
  reducerPath: 'Exercise',
  tagTypes: ['exercise'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/exercise',
  }),
  endpoints: (builder) => {
    return {
      getExercises: builder.query<ResponseObj<exerciseData>, void>({
        query: () => {
          return {
            method: 'GET',
            url: '/',
          };
        },
      }),
    };
  },
});

export const { useGetExercisesQuery } = ExerciseApi;
