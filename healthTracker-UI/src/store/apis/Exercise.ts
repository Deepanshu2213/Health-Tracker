import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  type exerciseDataNew,
  type exerciseData,
} from '../../components/ExerciseDetails';
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
        providesTags: (result) => {
          return (
            result?.data.map((exercise) => ({
              type: 'exercise' as const,
              id: exercise.id,
            })) || []
          );
        },
        query: () => {
          return {
            method: 'GET',
            url: '/',
          };
        },
      }),
      saveExercise: builder.mutation<
        ResponseObj<exerciseData>,
        exerciseDataNew
      >({
        invalidatesTags: (res) => {
          return [{ type: 'exercise' }];
        },
        query: (exercise) => {
          return {
            method: 'post',
            url: '/save',
            body: exercise,
          };
        },
      }),
    };
  },
});

export const { useGetExercisesQuery, useSaveExerciseMutation } = ExerciseApi;
