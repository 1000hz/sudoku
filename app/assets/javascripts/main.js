require.config({
  paths: {
    jquery: '../../components/jquery/dist/jquery'
  }
})

require(['jquery', 'app'], function ($, App) {
  App.start({el: '.puzzle-container'})
})