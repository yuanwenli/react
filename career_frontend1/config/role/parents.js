export default [
  {
    path: '/',
    redirect: '/archives',
    authority: ['parents'],
  },
  {
    path: '/archives',
    name: 'parents.archives',
    icon: 'folder',
    authority: ['parents'],
    component: './Parents/Archives/Archives'
  },
  // {
  //   path: '/class-activity',
  //   name: 'parents.classActivity',
  //   icon: 'picture',
  //   authority: ['parents'],
  //   component: './Parents/ClassActivity/ClassActivity'
  // },
  {
    path: '/class-activity',
    name: 'parents.classActivity',
    icon: 'environment',
    authority: ['parents'],
    routes: [
      {
        path: '/class-activity',
        redirect: '/class-activity/list',
      },
      {
        path: '/class-activity/list',
        component: './Parents/ClassActivity/ClassActivity'
      },
      {
        path: '/class-activity/detail',
        component: './Student/Activity/ActivityDetail'
      }
    ]
  },
  {
    path: '/my-activity',
    name: 'parents.myActivity',
    authority: ['parents'],
    icon: 'environment',
    component: './Parents/myActivity/myActivity'
  },
  {
    path: '/parents-study',
    name: 'parents.study',
    icon: 'play-circle',
    authority: ['parents'],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/parents-study',
        redirect: '/parents-study/list',
      },
      {
        path: '/parents-study/list',
        component: './Parents/Study/Study',
      },
      {
        path: '/parents-study/detail',
        name: 'detail',
        component: './Student/Study/CourseDetail',
      }
    ]
  },
  {
    path: '/parent-ability',
    name: 'parents.ability',
    icon: 'thunderbolt',
    authority: ['parents'],
    component: './Parents/PAbility/PAbility',
  },
  {
    path: '/rank',
    name: 'parents.rank',
    authority: ['parents'],
    icon: 'bar-chart',
    component: './Parents/Rank/Rank',
  },
  {
    path: '/parents-questionnaire',
    name: 'parents.questionnaire',
    icon: 'solution',
    authority: ['parents'],
    component: './Parents/Questionnaire/Questionnaire',
  },
  {
    path: '/parents-person',
    name: 'parents.person',
    icon: 'user',
    authority: ['parents'],
    component: './Parents/Person/Person',
  },
  {
    path: '/family',
    name: 'parents.family',
    authority: ['parents'],
    icon: 'share-alt',
    component: './Parents/Family/Family'
  },
  {
    path: '/parents-school',
    name: 'parents.school',
    icon: 'book',
    authority: ['parents'],
    component: './Student/School/School'
  },
  {
    path: '/parents-profession',
    name: 'parents.profession',
    icon: 'solution',
    authority: ['parents'],
    component: './Student/Profession/Profession',
  },
]
