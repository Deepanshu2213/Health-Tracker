import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Workout,
  WrokoutStatsView,
  newWorkOut,
} from '../../interface/Workout_Interfaces';
import { type ResponseObj } from '../interfaces/ResponseInterface';
interface graphQlResponseData<T> {
  [method: string]: T[];
}
interface graphQlResponse<T> {
  data: graphQlResponseData<T>;
}

export const WorkoutApi = createApi({
  reducerPath: 'Workout',
  tagTypes: ['Workout'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/workout',
  }),
  endpoints: (builder) => {
    return {
      saveWorkout: builder.mutation<Workout, newWorkOut>({
        invalidatesTags: (result, error, arg) => {
          return [{ type: 'Workout' }];
        },
        query: (workout) => {
          return {
            method: 'POST',
            url: '/save',
            body: workout,
          };
        },
      }),
      getWorkout: builder.query<
        graphQlResponse<Workout>,
        {
          startDate: string;
          endDate: string;
        }
      >({
        providesTags: (data, error, args) => {
          const workoutData = data?.data['getWorkout'].map((workout) => ({
            type: 'Workout' as const,
            id: workout.id,
          }));
          return workoutData || [];
        },
        query: ({
          startDate,
          endDate,
        }: {
          startDate: string;
          endDate: string;
        }) => {
          return {
            method: 'POST',
            url: '/graphql',
            body: {
              query: `
                    query($startDate: String, $endDate: String) {
                    getWorkout(startDate: $startDate, endDate: $endDate) {
                    id
                    createdAt
                  }
                }`,
              variables: { startDate, endDate },
            },
          };
        },
      }),
      getWorkoutStats: builder.query<graphQlResponse<WrokoutStatsView>, void>({
        providesTags: () => {
          return [{ type: 'Workout' }];
        },
        query: () => {
          return {
            method: 'POST',
            url: '/graphql',
            body: {
              query: `query {
                getStats{
                 userId
                 total_workouts
                 this_month
                 current_streak
                 max_streaks
                 }
                }`,
            },
          };
        },
      }),
      getAllWorkOut: builder.query<ResponseObj<Workout>, { day?: number }>({
        providesTags: () => {
          return [{ type: 'Workout' }];
        },
        query: ({ day }) => {
          return {
            method: 'GET',
            url: `/current${day || day == 0 ? `?day=${day}` : ''}`,
          };
        },
      }),
    };
  },
});

export const {
  useSaveWorkoutMutation,
  useGetWorkoutQuery,
  useGetWorkoutStatsQuery,
  useGetAllWorkOutQuery,
} = WorkoutApi;
