import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import './index.less'

export default class Info extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    user: null
  }

  componentDidMount = () => {
    const user = {
      type: {
        id: 0,
        value: '学生'
      },
      avatar: 'https://tse2-mm.cn.bing.net/th?id=OIP.dPir_9YtuhaGxUwswmcsgAHaI9&p=0&o=5&pid=1.1',
      name: 'Vincent',
      majors: [ '建筑', '景观' ]
    }

    setTimeout(() => {
      this.setState({
        user
      })
    }, 1000)
  }

  render() {
    const user = this.state.user

    return (
        <div>
          {
            !user ? null :
            <div className='Info'>
              <div className='App-avatar' style={{backgroundImage: `url(${user.avatar})`}} />
              <h3>{user.type.value}</h3>
              <h3>{user.name}</h3>

              <section>
                <h3>意向专业：</h3>
                {
                  user.majors.map((major, index) => <Tag key={index}>{major}</Tag> )
                }
              </section>
            </div>
          }
      </div>
    )
  }
}