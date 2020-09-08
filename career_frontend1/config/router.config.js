import student from './role/student';
import parents from './role/parents';
import teacher from './role/teacher';
import headTeacher from './role/headTeacher';
import school from './role/school';

export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // 学生端
      ...student,
      // 家长端
      ...parents,
      // 生涯老师
      ...teacher,
      // 班主任
      ...headTeacher,
      // 校管理员
      ...school,
      {
        path: '/'
      },
      {
        component: '404',
      },
    ],
  },

];
