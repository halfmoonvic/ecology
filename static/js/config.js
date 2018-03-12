(function () {
  window.urlConfig = {
    // 辐射监测
    radiationUrl: template('http://10.158.15.18:8081/tspf/gis/fsjc/fsjc-detail!list.action?stationcode={STATION_ID}'),
    // 生态遥感
    ecologicalRemoteSensing: template('http://10.158.15.25:10018/ecology/?itm=remotesense'),
    // 公众服务
    publicService: template('http://120.35.29.216:10004/PublishService/surround/surroundMain.vm'),
    // 企业服务
    enterpriseService: template('http://120.35.29.216:10007/EnterService/coporate/coporatePage.vm'),
    // 12369投诉
    '12369Complaint': template('http://www.12369.gov.cn/'),
    // 舆情
    publicSentiment: template('http://10.158.15.15:8080/yuqing'),
    // 污染源监管，点击企业弹出页面路径
    polluteEnt: template('http://120.35.29.216:10016/zhb/casLogin/dataInspectionForPeId/{msg.id}'),
    // 执法监察
    enforcementSupervision: template('http://10.158.15.10:10000/auth/goHome')
  }

  let tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g

  function template(str) {
    return function (context) {
      if (str == null) return ''
      return str.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
          return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context || {};
        var i, length, variable;

        for (i = 0, length = variables.length, variable = variables[i]; i < length; ++i) {
          currentObject = currentObject[variable];
          if (currentObject === undefined || currentObject === null) return '';
        }

        return currentObject;
      })
    }
  }
}())
