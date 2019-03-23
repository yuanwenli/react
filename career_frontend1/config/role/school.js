export default [
  {
    path: '/',
    redirect: '/school-index',
    authority: ['school'],
  },
  {
    path: '/school-index',
    name: 'school.index',
    icon: 'bar-chart',
    authority: ['school'],
    component: './School/Index/Index'
  },
  {
    path: '/school-evaluation',
    name: 'school.evaluation',
    icon: 'copy',
    authority: ['school'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/school-evaluation',
        redirect: '/school-evaluation/list',
      },
      {
        path: '/school-evaluation/list',
        name: 'list',
        component: './School/SchoolEvaluation/SchoolEvaluation'
      },
      {
        path: '/school-evaluation/detail',
        name: 'detail',
        component: './School/SchoolEvaluation/EvaluationDetail',
      },
      {
        path: '/school-evaluation/class-detail',
        name: 'classDetail',
        component: './School/SchoolEvaluation/EvaluationClass',
      },
      {
        path: '/school-evaluation/student',
        name: 'student',
        component: './School/SchoolEvaluation/EvaluationStudent',
      }
    ]
  },
  {
    path: '/school-ability',
    name: 'school.careerAbilityEvaluation',
    icon: 'thunderbolt',
    authority: ['school'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/school-ability',
        component: './HeadTeacher/CareerAbilityEvaluation/CareerAbilityEvaluation',
      },
      {
        path: '/school-ability/student',
        name: 'student',
        component: './HeadTeacher/CareerAbilityEvaluation/AbilityStudentDetail',
      }
    ]
  },
  {
    path: '/school-questionnaireManage',
    name: 'school.questionnaireManage',
    icon: 'solution',
    authority: ['school'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/school-questionnaireManage',
        redirect: '/school-questionnaireManage/list',
      },
      {
        path: '/school-questionnaireManage/list',
        name: 'questionnaireList',
        component: './HeadTeacher/QuestionnaireManage/QuestionnaireManage',
        hideChildrenInMenu: true,
      },
      {
        path: '/school-questionnaireManage/add',
        name: 'addQuestionnaire',
        component: './HeadTeacher/QuestionnaireManage/AddQuestionnaire',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/school-questionnaireManage/add',
            redirect: '/school-questionnaireManage/add/step1',
          },
          {
            path: '/school-questionnaireManage/add/step1',
            name: 'step1',
            component: './HeadTeacher/QuestionnaireManage/Step1',
          },
          {
            path: '/school-questionnaireManage/add/step2',
            name: 'step2',
            component: './HeadTeacher/QuestionnaireManage/Step2',
          },
          {
            path: '/school-questionnaireManage/add/step3',
            name: 'step3',
            component: './HeadTeacher/QuestionnaireManage/Step3',
          },
        ]
      },
    ],
  },
  {
    path: '/class-manage',
    name: 'school.classManage',
    icon: 'hdd',
    authority: ['school'],
    hideChildrenInMenu: true,
    routes: [
      // {
      //   path: '/class-manage',
      //   redirect: '/class-manage/list',
      // },
      {
        path: '/class-manage',
        name: 'classList',
        component: './School/ClassManage/ClassManage',
      },
      {
        path: '/class-manage/student',
        name: 'studentManage',
        component: './School/ClassManage/StudentList',
      }
    ]

  }
]
