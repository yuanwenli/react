export default [
  {
    path: '/',
    redirect: '/class-report',
    authority: ['headTeacher'],
  },
  {
    path: '/class-report',
    name: 'headTeacher.classReport',
    icon: 'solution',
    authority: ['headTeacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/class-report',
        component: './HeadTeacher/ClassReport/ClassReport',
      },
      {
        path: '/class-report/career-growth-record',
        name: 'careerGrowth',
        component: './HeadTeacher/ClassReport/CareerGrowth/CareerGrowth'
      },
      {
        path: '/class-report/class-report-detail',
        name: 'reportDetail',
        component: './Teacher/ExamManage/ExamManageDetail',
      },
      {
        path: '/class-report/class-activity-detail',
        name: 'activityDetail',
        component: './Student/Activity/ActivityDetail'
      }
    ]
  },
  {
    path: '/class-activity-manage',
    name: 'headTeacher.classActivityManage',
    icon: 'environment',
    authority: ['headTeacher'],
    component: './HeadTeacher/ClassActivityManage/ClassActivityManage'
  },
  {
    path: '/study-manage',
    name: 'headTeacher.studyManage',
    icon: 'play-circle',
    authority: ['headTeacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/study-manage',
        redirect: '/study-manage/list',
      },
      {
        path: '/study-manage/list',
        authority: ['headTeacher'],
        name: 'list',
        component: './HeadTeacher/StudyManage/StudyManage',
      },
      {
        path: '/study-manage/detail',
        authority: ['headTeacher'],
        name: 'detail',
        component: './Student/Study/CourseDetail',
      }
    ]
  },
  {
    path: '/career-ability-evaluation',
    name: 'headTeacher.careerAbilityEvaluation',
    icon: 'thunderbolt',
    authority: ['headTeacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/career-ability-evaluation',
        component: './HeadTeacher/CareerAbilityEvaluation/CareerAbilityEvaluation',
      },
      {
        path: '/career-ability-evaluation/student',
        name: 'student',
        component: './HeadTeacher/CareerAbilityEvaluation/AbilityStudentDetail',
      }
    ]
  },
  {
    path: '/questionnaireManage',
    name: 'headTeacher.questionnaireManage',
    icon: 'solution',
    authority: ['headTeacher'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/questionnaireManage',
        redirect: '/questionnaireManage/list',
      },
      {
        path: '/questionnaireManage/list',
        name: 'questionnaireList',
        component: './HeadTeacher/QuestionnaireManage/QuestionnaireManage',
        hideChildrenInMenu: true,
      },
      {
        path: '/questionnaireManage/add',
        name: 'addQuestionnaire',
        component: './HeadTeacher/QuestionnaireManage/AddQuestionnaire',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/questionnaireManage/add',
            redirect: '/questionnaireManage/add/step1',
          },
          {
            path: '/questionnaireManage/add/step1',
            name: 'step1',
            component: './HeadTeacher/QuestionnaireManage/Step1',
          },
          {
            path: '/questionnaireManage/add/step2',
            name: 'step2',
            component: './HeadTeacher/QuestionnaireManage/Step2',
          },
          {
            path: '/questionnaireManage/add/step3',
            name: 'step3',
            component: './HeadTeacher/QuestionnaireManage/Step3',
          },
        ]
      },
    ],
  },
  {
    path: '/headTeacher-school',
    name: 'headTeacher.school',
    authority: ['headTeacher'],
    icon: 'user',
    component: './Student/School/School'
  },
  {
    path: '/headTeacher-profession',
    name: 'headTeacher.profession',
    icon: 'book',
    authority: ['headTeacher'],
    component: './Student/Profession/Profession',
  },
]
