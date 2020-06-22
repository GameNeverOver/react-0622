import React from 'react';
import ReactDom, { render } from 'react-dom';
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import GlobalModel from './GlobalModel';
import {observer} from 'mobx-react'
// const globalModel = new GlobalModel();
import App from './components/app.jsx'
// const App = () => {
//     return <div>
//         开发环境配置完成
//         <Fun/>
//     </div>
// }

// ok
// @observer
// class Fun extends React.Component{
//     componentDidMount() {
//         console.log(globalModel,'xx')
//     }
//     render() {
//         return <div>
//             <button
//                 onClick={() => {
//                     globalModel.changeUserName('12')
//                 }}
//             >++</button>
//             {globalModel.username}
//         </div>
//     }
// }



ReactDom.render(
    <Provider globalModel={null}>
        <ConfigProvider locale={zhCN} 
            autoInsertSpaceInButton={true} 
            // componentSize={'large'}
        >
            <HashRouter>
                <App />
            </HashRouter>
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
);
