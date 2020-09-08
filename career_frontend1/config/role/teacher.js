export default [
  {
    path: '/',
    redirect: '/grade-report',
    authority: ['teacher'],
  },
  {
    path: '/grade-report',
    name: 'headTeacher.classReport',
    icon: 'solution',
    authority: ['teacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/grade-report',
        component: './HeadTeacher/ClassReport/ClassReport',
      },
      {
        path: '/grade-report/career-growth-record',
        name: 'careerGrowth',
        component: './HeadTeacher/ClassReport/CareerGrowth/CareerGrowth'
      },
      {
        path: '/grade-report/class-report-detail',
        name: 'reportDetail',
        component: './Teacher/ExamManage/ExamManageDetail',
      },
      {
        path: '/grade-report/class-activity-detail',
        name: 'activityDetail',
        component: './Student/Activity/ActivityDetail',
      }
    ]
  },
  // {
  //   path: '/student-archives',
  //   name: 'teacher.studentArchives',
  //   icon: 'folder',
  //   authority: ['teacher'],
  //   component: './Teacher/StudentArchives/StudentArchives',
  // },
  // {
  //   path: '/examManage',
  //   name: 'teacher.examManage',
  //   authority: ['teacher'],
  //   icon: 'file-text',
  //   hideChildrenInMenu: true,
  //   routes: [
  //     {
  //       path: '/examManage',
  //       redirect: '/examManage/list',
  //     },
  //     {
  //       path: '/examManage/list',
  //       component: './Teacher/ExamManage/ExamManage',
  //     },
  //     {
  //       path: '/examManage/detail',
  //       name: 'detail',
  //       component: './Teacher/ExamManage/ExamManageDetail'
  //     }
  //   ]
  // },
  {
    path: '/teacher-ability',
    name: 'teacher.careerAbilityEvaluation',
    icon: 'thunderbolt',
    authority: ['teacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/teacher-ability',
        component: './HeadTeacher/CareerAbilityEvaluation/CareerAbilityEvaluation',
      },
      {
        path: '/teacher-ability/student',
        name: 'student',
        component: './HeadTeacher/CareerAbilityEvaluation/AbilityStudentDetail',
      }
    ]
  },
  {
    path: '/teacher-study-manage',
    name: 'headTeacher.studyManage',
    icon: 'play-circle',
    authority: ['teacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/teacher-study-manage',
        redirect: '/teacher-study-manage/list',
      },
      {
        path: '/teacher-study-manage/list',
        authority: ['teacher'],
        name: 'list',
        component: './HeadTeacher/StudyManage/StudyManage',
      },
      {
        path: '/teacher-study-manage/detail',
        authority: ['teacher'],
        name: 'detail',
        component: './Student/Study/CourseDetail',
      }
    ]
  },
  {
    path: '/activityManage',
    name: 'teacher.activityManage',
    authority: ['teacher'],
    icon: 'environment',
    component: './HeadTeacher/ClassActivityManage/ClassActivityManage'
  },
  {
    path: '/teacher-questionnaireManage',
    name: 'teacher.questionnaireManage',
    icon: 'solution',
    authority: ['teacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/teacher-questionnaireManage',
        redirect: '/teacher-questionnaireManage/list',
      },
      {
        path: '/teacher-questionnaireManage/list',
        name: 'questionnaireList',
        component: './HeadTeacher/QuestionnaireManage/QuestionnaireManage',
        hideChildrenInMenu: true,
      },
      {
        path: '/teacher-questionnaireManage/add',
        name: 'addQuestionnaire',
        component: './HeadTeacher/QuestionnaireManage/AddQuestionnaire',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/teacher-questionnaireManage/add',
            redirect: '/teacher-questionnaireManage/add/step1',
          },
          {
            path: '/teacher-questionnaireManage/add/step1',
            name: 'step1',
            component: './HeadTeacher/QuestionnaireManage/Step1',
          },
          {
            path: '/teacher-questionnaireManage/add/step2',
            name: 'step2',
            component: './HeadTeacher/QuestionnaireManage/Step2',
          },
          {
            path: '/teacher-questionnaireManage/add/step3',
            name: 'step3',
            component: './HeadTeacher/QuestionnaireManage/Step3',
          },
        ]
      },
    ],
  },
  {
    path: '/teacher-school',
    name: 'teacher.school',
    icon: 'book',
    authority: ['teacher'],
    component: './Student/School/School'
  },
  {
    path: '/teacher-profession',
    name: 'teacher.profession',
    icon: 'solution',
    authority: ['teacher'],
    component: './Student/Profession/Profession',
  },
]
