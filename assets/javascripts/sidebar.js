define(function (require) {
  var $ = require('jquery')

  var Sidebar = function () {
    this.$main    = $('main')
    this.$sidebar = $('.sidebar')
    this.$overlay = $('<div class="sidebar-overlay" data-toggle="sidebar"/>')

    this.isOpen = false

    $(document).on('click.sudoku', '[data-toggle="sidebar"], .sidebar-btn', $.proxy(this.toggle, this))
  }

  Sidebar.prototype.toggle = function (e) {
    this.isOpen ? this.close() : this.open()
    this.isOpen = !this.isOpen
  }

  Sidebar.prototype.open = function () {
    this.$main
      .prepend(this.$overlay)
      .addClass('sidebar-open')
    this.$sidebar.addClass('open')
  }

  Sidebar.prototype.close = function () {
    this.$main.one('webkitTransitionEnd', $.proxy(function () {
      this.$overlay.remove()
      $('.sidebar').removeClass('open')
    }, this)).removeClass('sidebar-open')
  }

  return new Sidebar
})
