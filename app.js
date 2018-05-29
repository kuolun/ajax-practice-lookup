

var vm = new Vue({
  el: '#app',
  data: {
    success: null,
    email: '',
    time: 0,
    name: '',
    result: '',
    total: 0
  },
  methods: {
    checkSignUp: function (email) {
      axios.post('https://www.thef2e.com/api/isSignUp', {
        email: email
      })
        .then(function (response) {
          console.log(response)
          console.log(response.data)
          vm.success = response.data.success
          if (response.data.success) {
            console.log(response.data.timeStamp)
            // 將timestamp(milliseconds)轉成台灣時間
            let time = moment(response.data.timeStamp).locale('zh-tw').format('llll')
            vm.time = time
            vm.name = response.data.nickName
          } else {
            vm.result = response.data.message
          }
        })
        .catch(function (error) {
          console.log(error.message)
          vm.success = error.success
          vm.result = 'Error! Could not reach the API. ' + error.message
        })
    },
    checkTotalReg: function () {
      axios.get('https://www.thef2e.com/api/signUpTotal')
        .then(function (response) {
          console.log(response.data);
          vm.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error.message)
          vm.success = error.success
          vm.result = 'Error! Could not reach the API. ' + error.message
        })
    }

  }
})