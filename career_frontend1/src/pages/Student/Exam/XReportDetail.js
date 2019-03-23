import React, { Component } from 'react';
import XReport from './XReport';

class XReportDetail extends Component {

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;兴趣是人们力求认识某种事物或爱好某种活动的心理倾向，它能激发、引导人的思想和意志去努力探索某种事物的底蕴，直接促进其智力的发挥和学习效率的提高。正如科学大师爱因斯坦所说：“兴趣是最好的老师。”学生如果能在感兴趣的学科领域或学业道路上行走，那么他就会倾其全力，全神贯注地去学习。反之，如果学生所学科目和所走的路与兴趣不吻合，他可能会缺乏主动性，勉强应付自己的学业和学业道路，甚至会产生厌学的心理。
          </p>
          <h4>通过本次测试可知，你的学科兴趣倾向得分如下：</h4>
          <XReport data={data.TestData} />
          <h4>结果</h4>
          {
            data.Conclusion.Code.map(item => <p>你对{item.Name}{item.Msg}</p>)
          }
          <h4>说明</h4>
          <p>你在某学科兴趣类型上的得分越高，表明你越适合学习与之相匹配的课程，反之，你在某学科兴趣类型上的得分越低，表明你越不适合学习与之相匹配的课程。如果你大多数学科分数都比较高，则表明你热爱学习，把学习看成一种乐趣。如果各学科的得分相差悬殊，则表明你的学科兴趣倾向性明显。如果你对大多数学科都属于兴趣一般或者不感兴趣的话，则表明你缺乏学习热情，应该检查自己的学习态度。
          </p>
        </div>
      ) : ''
    )
  }
}

export default XReportDetail;
