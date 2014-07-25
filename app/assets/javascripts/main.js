require.config({
  paths: {
    jquery: '../../jquery/dist/jquery'
  }
})

require(['jquery', 'app'], function ($, App) {
  App.start()
})