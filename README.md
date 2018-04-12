## Development Documentation

* [Client documentation](https://github.com/77Vincent/xfolio/tree/master/client)
* [Server documentation](https://github.com/77Vincent/xfolio/tree/master/server)

## User Story
### 导航条
* 非固定，背景色全宽，内容区同主体部分容器宽

### 登录页
* 可用于登陆的ID包括：手机号、邮箱
* 微信登陆

### 注册页
* ID：手机号、邮箱注册（需有相应的验证）
* 后端预留用户名，自动生成，客户端不暴露给用户，作为标准实践，以便日后需要。
* 注册时不区分身份，默认皆为学生，后可申请成为老师，申请后通过认证身份才会变成老师。

### 老师搜索页
* 老师有active状态，默认true，可被搜出
* 过滤器：专业、性别、上课方式、地点、国家、价格
* 一次只显示一个老师，类似幻灯片的方式切换
* 左右切换老师
* 老师背景图轮播，共可放置三张，第一张为头像，后两张需自行设置
* 点击红心收藏老师，加进我的老师列表
* 点击按钮“跟ta学习”，进入老师主页

### 老师主页
* 老师才开放主页功能
* 每条状态图片不超过5张，配文不超过200个字符。
* 每条状态有点赞和评论区
* 访客（非注册用户）也可点赞，评论只能是注册用户。

### 信箱系统

### 支付、订单系统

