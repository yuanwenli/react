export default [
  {
    path: '/',
    authority: ['student'],
    redirect: '/evaluation',
  },
  {
    path: '/evaluation',
    hideChildrenInMenu: true,
    name: 'student.evaluation',
    icon: 'calculator',
    authority: ['student'],
    routes: [
      {
        path: '/evaluation',
        component: './Student/Evaluation/Evaluation',
      },
      {
        path: '/evaluation/career-credit',
        name: 'careerCredit',
        component: './Student/Evaluation/CareerCredit',
        hideInMenu: true,
      },
      {
        path: '/evaluation/career-ability',
        name: 'careerAbility',
        component: './Student/Evaluation/CareerAbility',
      },
      {
        path: '/evaluation/career-interest',
        name: 'careerInterest',
        component: './Student/Evaluation/CareerInterest',
      },
      {
        path: '/evaluation/career-rank',
        name: 'careerRank',
        component: './Student/Evaluation/CareerRank',
      }
    ]
  },
  {
    path: '/exam',
    name: 'student.exam',
    authority: ['student'],
    icon: 'copy',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/exam',
        redirect: '/exam/list',
      },
      {
        path: '/exam/list',
        authority: ['student'],
        component: './Student/Exam/Exam',
      },
      {
        path: '/exam/title',
        authority: ['student'],
        name: 'title',
        component: './Student/Exam/ExamTitle'
      }
    ]
  },
  {
    path: '/activity',
    name: 'student.activity',
    icon: 'environment',
    authority: ['student'],
    routes: [
      {
        path: '/activity',
        redirect: '/activity/list',
      },
      {
        path: '/activity/list',
        component: './Student/Activity/Activity',
      },
      {
        path: '/activity/detail',
        component: './Student/Activity/ActivityDetail'
      }
    ]
  },
  {
    path: '/student-study',
    name: 'student.study',
    icon: 'play-circle',
    authority: ['student'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/student-study',
        authority: ['student'],
        redirect: '/student-study/list',
      },
      {
        path: '/student-study/list',
        authority: ['student'],
        component: './Student/Study/Study',
      },
      {
        path: '/student-study/detail',
        // authority: ['student'],
        name: 'detail',
        component: './Student/Study/CourseDetail',
      }
    ]
  },
  {
    path: '/student-ability',
    name: 'student.ability',
    icon: 'thunderbolt',
    authority: ['student'],
    component: './Student/Ability/Ability',
  },
  {
    path: '/student-questionnaire',
    name: 'student.questionnaire',
    icon: 'solution',
    authority: ['student'],
    component: './Student/Questionnaire/Questionnaire',
  },
  {
    path: '/person',
    name: 'student.person',
    icon: 'user',
    authority: ['student'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/person',
        redirect: '/person/detail',
      },
      {
        path: '/person/detail',
        component: './Student/Person/Person',
      },
      {
        path: '/person/choose-idol',
        name: 'choose',
        component: './Student/Person/ChooseIdol',
      }
    ]
  },
  {
    path: '/student-school',
    name: 'student.school',
    icon: 'book',
    authority: ['student'],
    component: './Student/School/School',
  },
  {
    path: '/student-profession',
    name: 'student.profession',
    icon: 'solution',
    authority: ['student'],
    component: './Student/Profession/Profession',
  },
]
