import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from 'containers/app/app';
import Login from 'containers/login/login';
import Main from 'containers/main/main';
import MainPanel from 'containers/mainpanel/mainpanel';
import PlatformMgr from 'containers/platform/platform';
import AddPlatform from 'containers/platform/addplatform';
import ChgPlatform from 'containers/platform/chgplatform';
import GameServerMgr from 'containers/gameserver/gameserver';
import AddServer from 'containers/gameserver/addgameserver';
import ChgGameServer from 'containers/gameserver/chggameserver';
import GameAreaMgr from 'containers/gamearea/gamearea';
import AddArea from 'containers/gamearea/addgamearea';
import ChgGameArea from 'containers/gamearea/chggamearea';
import AccMgr from 'containers/accmgr/accmgr';
import AddAccount from 'containers/accmgr/addacc';
import ChgAccount from 'containers/accmgr/chgacc';
import AccGroupMgr from 'containers/accgroupmgr/accgroupmgr';
import AddAccountGroup from 'containers/accgroupmgr/addaccgroup';
import ChgAccountGroup from 'containers/accgroupmgr/chgaccgroup';
import AreaStatus from 'containers/areastatus/areastatus';
import OnlineNumCal from 'containers/onlinenum/onlinenum';
import SearchPlayer from 'containers/playerinfo/searchplayer';
import ShowPlayerDetail from 'containers/playerinfo/playerdetail';
import SearchBanAccount from 'containers/banaccount/searchbanaccount';
import ShowShieldWord from 'containers/shieldword/shieldword';
import Me from 'containers/me/me';
import TryUI from 'containers/try/try';
import OperationGag from 'containers/operationgag/operationgag';
import OperationUnGag from 'containers/operationgag/operationungag';
import QueryGag from 'containers/operationgag/querygag';
import QueryNotice from 'containers/notice/querynotice';
import AddNoticeDs from 'containers/notice/addnoticeds';
import AddNoticeJs from 'containers/notice/addnoticejs';

export default (store) => {
  // 返回路由组件
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="main" component={Main}>
        <Route path="mainpanel" component={MainPanel}/>
      </Route>
    </Route>
  );
};
