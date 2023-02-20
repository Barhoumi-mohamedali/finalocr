'use strict';
var Layout = (function() {
    $('.navbar-main .dropdown').on('hide.bs.dropdown', function() { var $this = $(this).find('.dropdown-menu');
        $this.addClass('close');
        setTimeout(function() { $this.removeClass('close'); }, 200); });
    $('.dropdown-submenu > .dropdown-toggle').click(function(e) { e.preventDefault();
        $(this).parent('.dropdown-submenu').toggleClass('show'); });
    $('.dropdown').hover(function() { $(this).addClass('show');
        $(this).find('.dropdown-menu').addClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'true'); }, function() { $(this).removeClass('show');
        $(this).find('.dropdown-menu').removeClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'false'); });
    $('.dropdown').click(function() { if ($(this).hasClass('show')) { $(this).removeClass('show');
            $(this).find('.dropdown-menu').removeClass('show');
            $(this).find('.dropdown-toggle').attr('aria-expanded', 'false'); } else { $(this).addClass('show');
            $(this).find('.dropdown-menu').addClass('show');
            $(this).find('.dropdown-toggle').attr('aria-expanded', 'true'); } });

    function pinSidenav() { $('.sidenav-toggler').addClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-unpin');
        $('body').removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
        $('body').append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $('#sidenav-main').data('target') + ' />');
        Cookies.set('sidenav-state', 'pinned'); }

    function unpinSidenav() { $('.sidenav-toggler').removeClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-pin');
        $('body').removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
        $('body').find('.backdrop').remove();
        Cookies.set('sidenav-state', 'unpinned'); }
    var $sidenavState = Cookies.get('sidenav-state') ? Cookies.get('sidenav-state') : 'pinned';
    if ($(window).width() > 1200) {
        if ($sidenavState == 'pinned') { pinSidenav() }
        if (Cookies.get('sidenav-state') == 'unpinned') { unpinSidenav() }
        $(window).resize(function() { if ($('body').hasClass('g-sidenav-show') && !$('body').hasClass('g-sidenav-pinned')) { $('body').removeClass('g-sidenav-show').addClass('g-sidenav-hidden'); } })
    }
    if ($(window).width() < 1200) { $('body').removeClass('g-sidenav-hide').addClass('g-sidenav-hidden');
        $('body').removeClass('g-sidenav-show');
        $(window).resize(function() { if ($('body').hasClass('g-sidenav-show') && !$('body').hasClass('g-sidenav-pinned')) { $('body').removeClass('g-sidenav-show').addClass('g-sidenav-hidden'); } }) }
    $("body").on("click", "[data-action]", function(e) {
        e.preventDefault();
        var $this = $(this);
        var action = $this.data('action');
        var target = $this.data('target');
        switch (action) {
            case 'sidenav-pin':
                pinSidenav();
                break;
            case 'sidenav-unpin':
                unpinSidenav();
                break;
            case 'search-show':
                target = $this.data('target');
                $('body').removeClass('g-navbar-search-show').addClass('g-navbar-search-showing');
                setTimeout(function() { $('body').removeClass('g-navbar-search-showing').addClass('g-navbar-search-show'); }, 150);
                setTimeout(function() { $('body').addClass('g-navbar-search-shown'); }, 300)
                break;
            case 'search-close':
                target = $this.data('target');
                $('body').removeClass('g-navbar-search-shown');
                setTimeout(function() { $('body').removeClass('g-navbar-search-show').addClass('g-navbar-search-hiding'); }, 150);
                setTimeout(function() { $('body').removeClass('g-navbar-search-hiding').addClass('g-navbar-search-hidden'); }, 300);
                setTimeout(function() { $('body').removeClass('g-navbar-search-hidden'); }, 500);
                break;
        }
    })
    $('.sidenav').on('mouseenter', function() { if (!$('body').hasClass('g-sidenav-pinned')) { $('body').removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show'); } })
    $('.sidenav').on('mouseleave', function() { if (!$('body').hasClass('g-sidenav-pinned')) { $('body').removeClass('g-sidenav-show').addClass('g-sidenav-hide');
            setTimeout(function() { $('body').removeClass('g-sidenav-hide').addClass('g-sidenav-hidden'); }, 300); } })
    $(window).on('load resize', function() { if ($('body').height() < 800) { $('body').css('min-height', '100vh');
            $('#footer-main').addClass('footer-auto-bottom') } })
})();
'use strict';
var Charts = (function() {
    var $toggle = $('[data-toggle="chart"]');
    var mode = 'light';
    var fonts = { base: 'Open Sans' }
    var colors = { gray: { 100: '#f6f9fc', 200: '#e9ecef', 300: '#dee2e6', 400: '#ced4da', 500: '#adb5bd', 600: '#8898aa', 700: '#525f7f', 800: '#32325d', 900: '#212529' }, theme: { 'default': '#172b4d', 'primary': '#5e72e4', 'secondary': '#f4f5f7', 'info': '#11cdef', 'success': '#2dce89', 'danger': '#f5365c', 'warning': '#fb6340' }, black: '#12263F', white: '#FFFFFF', transparent: 'transparent', };

    function chartOptions() {
        var options = { defaults: { global: { responsive: true, maintainAspectRatio: false, defaultColor: (mode == 'dark') ? colors.gray[700] : colors.gray[600], defaultFontColor: (mode == 'dark') ? colors.gray[700] : colors.gray[600], defaultFontFamily: fonts.base, defaultFontSize: 13, layout: { padding: 0 }, legend: { display: false, position: 'bottom', labels: { usePointStyle: true, padding: 16 } }, elements: { point: { radius: 0, backgroundColor: colors.theme['primary'] }, line: { tension: .4, borderWidth: 4, borderColor: colors.theme['primary'], backgroundColor: colors.transparent, borderCapStyle: 'rounded' }, rectangle: { backgroundColor: colors.theme['warning'] }, arc: { backgroundColor: colors.theme['primary'], borderColor: (mode == 'dark') ? colors.gray[800] : colors.white, borderWidth: 4 } }, tooltips: { enabled: true, mode: 'index', intersect: false, } }, doughnut: { cutoutPercentage: 83, legendCallback: function(chart) { var data = chart.data; var content = '';
                        data.labels.forEach(function(label, index) { var bgColor = data.datasets[0].backgroundColor[index];
                            content += '<span class="chart-legend-item">';
                            content += '<i class="chart-legend-indicator" style="background-color: ' + bgColor + '"></i>';
                            content += label;
                            content += '</span>'; }); return content; } } } }
        Chart.scaleService.updateScaleDefaults('linear', { gridLines: { borderDash: [2], borderDashOffset: [2], color: (mode == 'dark') ? colors.gray[900] : colors.gray[300], drawBorder: false, drawTicks: false, drawOnChartArea: true, zeroLineWidth: 0, zeroLineColor: 'rgba(0,0,0,0)', zeroLineBorderDash: [2], zeroLineBorderDashOffset: [2] }, ticks: { beginAtZero: true, padding: 10, callback: function(value) { if (!(value % 10)) { return value } } } });
        Chart.scaleService.updateScaleDefaults('category', { gridLines: { drawBorder: false, drawOnChartArea: false, drawTicks: false }, ticks: { padding: 20 }, maxBarThickness: 10 });
        return options;
    }

    function parseOptions(parent, options) { for (var item in options) { if (typeof options[item] !== 'object') { parent[item] = options[item]; } else { parseOptions(parent[item], options[item]); } } }

    function pushOptions(parent, options) { for (var item in options) { if (Array.isArray(options[item])) { options[item].forEach(function(data) { parent[item].push(data); }); } else { pushOptions(parent[item], options[item]); } } }

    function popOptions(parent, options) { for (var item in options) { if (Array.isArray(options[item])) { options[item].forEach(function(data) { parent[item].pop(); }); } else { popOptions(parent[item], options[item]); } } }

    function toggleOptions(elem) { var options = elem.data('add'); var $target = $(elem.data('target')); var $chart = $target.data('chart'); if (elem.is(':checked')) { pushOptions($chart, options);
            $chart.update(); } else { popOptions($chart, options);
            $chart.update(); } }

    function updateOptions(elem) { var options = elem.data('update'); var $target = $(elem.data('target')); var $chart = $target.data('chart');
        parseOptions($chart, options);
        toggleTicks(elem, $chart);
        $chart.update(); }

    function toggleTicks(elem, $chart) {
        if (elem.data('prefix') !== undefined || elem.data('prefix') !== undefined) {
            var prefix = elem.data('prefix') ? elem.data('prefix') : '';
            var suffix = elem.data('suffix') ? elem.data('suffix') : '';
            $chart.options.scales.yAxes[0].ticks.callback = function(value) { if (!(value % 10)) { return prefix + value + suffix; } }
            $chart.options.tooltips.callbacks.label = function(item, data) {
                var label = data.datasets[item.datasetIndex].label || '';
                var yLabel = item.yLabel;
                var content = '';
                if (data.datasets.length > 1) { content += '<span class="popover-body-label mr-auto">' + label + '</span>'; }
                content += '<span class="popover-body-value">' + prefix + yLabel + suffix + '</span>';
                return content;
            }
        }
    }
    if (window.Chart) { parseOptions(Chart, chartOptions()); }
    $toggle.on({ 'change': function() { var $this = $(this); if ($this.is('[data-add]')) { toggleOptions($this); } }, 'click': function() { var $this = $(this); if ($this.is('[data-update]')) { updateOptions($this); } } });
    return { colors: colors, fonts: fonts, mode: mode };
})();
'use strict';
var CopyIcon = (function() {
    var $element = '.btn-icon-clipboard',
        $btn = $($element);

    function init($this) {
        $this.tooltip().on('mouseleave', function() { $this.tooltip('hide'); });
        var clipboard = new ClipboardJS($element);
        clipboard.on('success', function(e) {
            $(e.trigger).attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle')
            e.clearSelection()
        });
    }
    if ($btn.length) { init($btn); }
})();
'use strict';
var Navbar = (function() {
    var $nav = $('.navbar-nav, .navbar-nav .nav');
    var $collapse = $('.navbar .collapse');
    var $dropdown = $('.navbar .dropdown');

    function accordion($this) { $this.closest($nav).find($collapse).not($this).collapse('hide'); }

    function closeDropdown($this) { var $dropdownMenu = $this.find('.dropdown-menu');
        $dropdownMenu.addClass('close');
        setTimeout(function() { $dropdownMenu.removeClass('close'); }, 200); }
    $collapse.on({ 'show.bs.collapse': function() { accordion($(this)); } })
    $dropdown.on({ 'hide.bs.dropdown': function() { closeDropdown($(this)); } })
})();
var NavbarCollapse = (function() {
    var $nav = $('.navbar-nav'),
        $collapse = $('.navbar .navbar-custom-collapse');

    function hideNavbarCollapse($this) { $this.addClass('collapsing-out'); }

    function hiddenNavbarCollapse($this) { $this.removeClass('collapsing-out'); }
    if ($collapse.length) {
        $collapse.on({ 'hide.bs.collapse': function() { hideNavbarCollapse($collapse); } })
        $collapse.on({ 'hidden.bs.collapse': function() { hiddenNavbarCollapse($collapse); } })
    }
})();
'use strict';
var Popover = (function() {
    var $popover = $('[data-toggle="popover"]'),
        $popoverClass = '';

    function init($this) {
        if ($this.data('color')) { $popoverClass = 'popover-' + $this.data('color'); }
        var options = { trigger: 'focus', template: '<div class="popover ' + $popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' };
        $this.popover(options);
    }
    if ($popover.length) { $popover.each(function() { init($(this)); }); }
})();
'use strict';
var ScrollTo = (function() {
    var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a');

    function scrollTo($this) { var $el = $this.attr('href'); var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0; var options = { scrollTop: $($el).offset().top - offset };
        $('html, body').stop(true, true).animate(options, 600);
        event.preventDefault(); }
    if ($scrollTo.length) { $scrollTo.on('click', function(event) { scrollTo($(this)); }); }
})();
'use strict';
var Tooltip = (function() {
    var $tooltip = $('[data-toggle="tooltip"]');

    function init() { $tooltip.tooltip(); }
    if ($tooltip.length) { init(); }
})();
'use strict';
var Checklist = (function() {
    var $list = $('[data-toggle="checklist"]')

    function init($this) { var $checkboxes = $this.find('.checklist-entry input[type="checkbox"]');
        $checkboxes.each(function() { checkEntry($(this)); }); }

    function checkEntry($checkbox) { if ($checkbox.is(':checked')) { $checkbox.closest('.checklist-item').addClass('checklist-item-checked'); } else { $checkbox.closest('.checklist-item').removeClass('checklist-item-checked'); } }
    if ($list.length) { $list.each(function() { init($(this)); });
        $list.find('input[type="checkbox"]').on('change', function() { checkEntry($(this)); }); }
})();
'use strict';
var FormControl = (function() {
    var $input = $('.form-control');

    function init($this) { $this.on('focus blur', function(e) { $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus')); }).trigger('blur'); }
    if ($input.length) { init($input); }
})();
var $map = $('#map-default'),
    map, lat, lng, color = "#5e72e4";

function initMap() {
    map = document.getElementById('map-default');
    lat = map.getAttribute('data-lat');
    lng = map.getAttribute('data-lng');
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = { zoom: 12, scrollwheel: false, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP, }
    map = new google.maps.Map(map, mapOptions);
    var marker = new google.maps.Marker({ position: myLatlng, map: map, animation: google.maps.Animation.DROP, title: 'Hello World!' });
    var contentString = '<div class="info-window-content"><h2>Argon Dashboard PRO</h2>' +
        '<p>A beautiful premium dashboard for Bootstrap 4.</p></div>';
    var infowindow = new google.maps.InfoWindow({ content: contentString });
    google.maps.event.addListener(marker, 'click', function() { infowindow.open(map, marker); });
}
if ($map.length) { google.maps.event.addDomListener(window, 'load', initMap); }
var $map = $('#map-custom'),
    map, lat, lng, color = "#5e72e4";

function initMap() {
    map = document.getElementById('map-custom');
    lat = map.getAttribute('data-lat');
    lng = map.getAttribute('data-lng');
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = { zoom: 12, scrollwheel: false, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": color }, { "visibility": "on" }] }] }
    map = new google.maps.Map(map, mapOptions);
    var marker = new google.maps.Marker({ position: myLatlng, map: map, animation: google.maps.Animation.DROP, title: 'Hello World!' });
    var contentString = '<div class="info-window-content"><h2>Argon Dashboard PRO</h2>' +
        '<p>A beautiful premium dashboard for Bootstrap 4.</p></div>';
    var infowindow = new google.maps.InfoWindow({ content: contentString });
    google.maps.event.addListener(marker, 'click', function() { infowindow.open(map, marker); });
}
'use strict';
var BarStackedChart = (function() {
    var $chart = $('#chart-bar-stacked');

    function init($this) {
        var randomScalingFactor = function() { return Math.round(Math.random() * 100); };
        var data = { labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], datasets: [{ label: 'Dataset 1', backgroundColor: Charts.colors.theme['danger'], data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()] }, { label: 'Dataset 2', backgroundColor: Charts.colors.theme['primary'], data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()] }, { label: 'Dataset 3', backgroundColor: Charts.colors.theme['success'], data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()] }] };
        var options = { tooltips: { mode: 'index', intersect: false }, responsive: true, scales: { xAxes: [{ stacked: true, }], yAxes: [{ stacked: true }] } }
        var barStackedChart = new Chart($this, { type: 'bar', data: data, options: options });
        $this.data('chart', barStackedChart);
    };
    if ($chart.length) { init($chart); }
})();
'use strict';
var DoughnutChart = (function() { var $chart = $('#chart-doughnut');

    function init($this) { var randomScalingFactor = function() { return Math.round(Math.random() * 100); }; var doughnutChart = new Chart($this, { type: 'doughnut', data: { labels: ['Danger', 'Warning', 'Success', 'Primary', 'Info'], datasets: [{ data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), ], backgroundColor: [Charts.colors.theme['danger'], Charts.colors.theme['warning'], Charts.colors.theme['success'], Charts.colors.theme['primary'], Charts.colors.theme['info'], ], label: 'Dataset 1' }], }, options: { responsive: true, legend: { position: 'top', }, animation: { animateScale: true, animateRotate: true } } });
        $this.data('chart', doughnutChart); }; if ($chart.length) { init($chart); } })();
'use strict';
var PieChart = (function() { var $chart = $('#chart-pie');

    function init($this) { var randomScalingFactor = function() { return Math.round(Math.random() * 100); }; var pieChart = new Chart($this, { type: 'pie', data: { labels: ['Danger', 'Warning', 'Success', 'Primary', 'Info'], datasets: [{ data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), ], backgroundColor: [Charts.colors.theme['danger'], Charts.colors.theme['warning'], Charts.colors.theme['success'], Charts.colors.theme['primary'], Charts.colors.theme['info'], ], label: 'Dataset 1' }], }, options: { responsive: true, legend: { position: 'top', }, animation: { animateScale: true, animateRotate: true } } });
        $this.data('chart', pieChart); }; if ($chart.length) { init($chart); } })();
'use strict';
var PointsChart = (function() { var $chart = $('#chart-points');

    function init($this) { var salesChart = new Chart($this, { type: 'line', options: { scales: { yAxes: [{ gridLines: { color: Charts.colors.gray[200], zeroLineColor: Charts.colors.gray[200] }, ticks: {} }] } }, data: { labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Performance', data: [10, 18, 28, 23, 28, 40, 36, 46, 52], pointRadius: 10, pointHoverRadius: 15, showLine: false }] } });
        $this.data('chart', salesChart); }; if ($chart.length) { init($chart); } })();
'use strict';
var SalesChart = (function() { var $chart = $('#chart-sales-dark');

    function init($this) { var salesChart = new Chart($this, { type: 'line', options: { scales: { yAxes: [{ gridLines: { color: Charts.colors.gray[700], zeroLineColor: Charts.colors.gray[700] }, ticks: {} }] } }, data: { labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Performance', data: [0, 20, 10, 30, 15, 40, 20, 60, 60] }] } });
        $this.data('chart', salesChart); }; if ($chart.length) { init($chart); } })();
'use strict';
var SalesChart = (function() { var $chart = $('#chart-sales');

    function init($this) { var salesChart = new Chart($this, { type: 'line', options: { scales: { yAxes: [{ gridLines: { color: Charts.colors.gray[200], zeroLineColor: Charts.colors.gray[200] }, ticks: {} }] } }, data: { labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Performance', data: [0, 20, 10, 30, 15, 40, 20, 60, 60] }] } });
        $this.data('chart', salesChart); }; if ($chart.length) { init($chart); } })();
var BarsChart = (function() {
    var $chart = $('#chart-bars');

    function initChart($chart) { var ordersChart = new Chart($chart, { type: 'bar', data: { labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Sales', data: [25, 20, 30, 22, 17, 29] }] } });
        $chart.data('chart', ordersChart); }
    if ($chart.length) { initChart($chart); }
})();
'use strict';
var LineChart = (function() { var $chart = $('#chart-line');

    function init($this) { var salesChart = new Chart($this, { type: 'line', options: { scales: { yAxes: [{ gridLines: { color: Charts.colors.gray[200], zeroLineColor: Charts.colors.gray[200] }, ticks: {} }] } }, data: { labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Performance', data: [0, 20, 10, 30, 15, 40, 20, 60, 60] }] } });
        $this.data('chart', salesChart); }; if ($chart.length) { init($chart); } })();
if ($('[data-toggle="widget-calendar"]')[0]) { $('[data-toggle="widget-calendar"]').fullCalendar({ contentHeight: 'auto', theme: false, buttonIcons: { prev: ' ni ni-bold-left', next: ' ni ni-bold-right' }, header: { right: 'next', center: 'title, ', left: 'prev' }, defaultDate: '2018-12-01', editable: true, events: [{ title: 'Call with Dave', start: '2018-11-18', end: '2018-11-18', className: 'bg-red' }, { title: 'Lunch meeting', start: '2018-11-21', end: '2018-11-22', className: 'bg-orange' }, { title: 'All day conference', start: '2018-11-29', end: '2018-11-29', className: 'bg-green' }, { title: 'Meeting with Mary', start: '2018-12-01', end: '2018-12-01', className: 'bg-blue' }, { title: 'Winter Hackaton', start: '2018-12-03', end: '2018-12-03', className: 'bg-red' }, { title: 'Digital event', start: '2018-12-07', end: '2018-12-09', className: 'bg-warning' }, { title: 'Marketing event', start: '2018-12-10', end: '2018-12-10', className: 'bg-purple' }, { title: 'Dinner with Family', start: '2018-12-19', end: '2018-12-19', className: 'bg-red' }, { title: 'Black Friday', start: '2018-12-23', end: '2018-12-23', className: 'bg-blue' }, { title: 'Cyber Week', start: '2018-12-02', end: '2018-12-02', className: 'bg-yellow' }, ] }); var mYear = moment().format('YYYY'); var mDay = moment().format('dddd, MMM D');
    $('.widget-calendar-year').html(mYear);
    $('.widget-calendar-day').html(mDay); }
'use strict';
var DatatableBasic = (function() {
    var $dtBasic = $('#datatable-basic');

    function init($this) { var options = { keys: !0, select: { style: "multi" }, language: { paginate: { previous: "<i class='fas fa-angle-left'>", next: "<i class='fas fa-angle-right'>" } }, }; var table = $this.on('init.dt', function() { $('div.dataTables_length select').removeClass('custom-select custom-select-sm'); }).DataTable(options); }
    if ($dtBasic.length) { init($dtBasic); }
})();
var DatatableButtons = (function() {
    var $dtButtons = $('#datatable-buttons');

    function init($this) { var buttons = ["copy", "print"]; var options = { lengthChange: !1, dom: 'Bfrtip', buttons: buttons, language: { paginate: { previous: "<i class='fas fa-angle-left'>", next: "<i class='fas fa-angle-right'>" } } }; var table = $this.on('init.dt', function() { $('.dt-buttons .btn').removeClass('btn-secondary').addClass('btn-sm btn-default'); }).DataTable(options); }
    if ($dtButtons.length) { init($dtButtons); }
})();
'use strict';
var Dropzones = (function() {
    var $dropzone = $('[data-toggle="dropzone"]');
    var $dropzonePreview = $('.dz-preview');

    function init($this) {
        var multiple = ($this.data('dropzone-multiple') !== undefined) ? true : false;
        var preview = $this.find($dropzonePreview);
        var currentFile = undefined;
        var options = {
            url: $this.data('dropzone-url'),
            thumbnailWidth: null,
            thumbnailHeight: null,
            previewsContainer: preview.get(0),
            previewTemplate: preview.html(),
            maxFiles: (!multiple) ? 1 : null,
            acceptedFiles: (!multiple) ? 'image/*' : null,
            init: function() {
                this.on("addedfile", function(file) {
                    if (!multiple && currentFile) { this.removeFile(currentFile); }
                    currentFile = file;
                })
            }
        }
        preview.html('');
        $this.dropzone(options)
    }

    function globalOptions() { Dropzone.autoDiscover = false; }
    if ($dropzone.length) { globalOptions();
        $dropzone.each(function() { init($(this)); }); }
})();
'use strict';
var Datepicker = (function() {
    var $datepicker = $('.datepicker');

    function init($this) { var options = { disableTouchKeyboard: true, autoclose: false };
        $this.datepicker(options); }
    if ($datepicker.length) { $datepicker.each(function() { init($(this)); }); }
})();
'use strict';
var noUiSlider = (function() {
    if ($(".input-slider-container")[0]) { $('.input-slider-container').each(function() { var slider = $(this).find('.input-slider'); var sliderId = slider.attr('id'); var minValue = slider.data('range-value-min'); var maxValue = slider.data('range-value-max'); var sliderValue = $(this).find('.range-slider-value'); var sliderValueId = sliderValue.attr('id'); var startValue = sliderValue.data('range-value-low'); var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);
            noUiSlider.create(c, { start: [parseInt(startValue)], connect: [true, false], range: { 'min': [parseInt(minValue)], 'max': [parseInt(maxValue)] } });
            c.noUiSlider.on('update', function(a, b) { d.textContent = a[b]; }); }) }
    if ($("#input-slider-range")[0]) { var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];
        noUiSlider.create(c, { start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))], connect: !0, range: { min: parseInt(c.getAttribute('data-range-value-min')), max: parseInt(c.getAttribute('data-range-value-max')) } }), c.noUiSlider.on("update", function(a, b) { f[b].textContent = a[b] }) }
})();
'use strict';
var Scrollbar = (function() {
    var $scrollbar = $('.scrollbar-inner');

    function init() { $scrollbar.scrollbar().scrollLock() }
    if ($scrollbar.length) { init(); }
})();
'use strict';
var Fullcalendar = (function() {
    var $calendar = $('[data-toggle="calendar"]');

    function init($this) {
        var events = [{ id: 1, title: 'Call with Dave', start: '2018-11-18', allDay: true, className: 'bg-red', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 2, title: 'Lunch meeting', start: '2018-11-21', allDay: true, className: 'bg-orange', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 3, title: 'All day conference', start: '2018-11-29', allDay: true, className: 'bg-green', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 4, title: 'Meeting with Mary', start: '2018-12-01', allDay: true, className: 'bg-blue', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 5, title: 'Winter Hackaton', start: '2018-12-03', allDay: true, className: 'bg-red', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 6, title: 'Digital event', start: '2018-12-07', allDay: true, className: 'bg-warning', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 7, title: 'Marketing event', start: '2018-12-10', allDay: true, className: 'bg-purple', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 8, title: 'Dinner with Family', start: '2018-12-19', allDay: true, className: 'bg-red', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 9, title: 'Black Friday', start: '2018-12-23', allDay: true, className: 'bg-blue', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, { id: 10, title: 'Cyber Week', start: '2018-12-02', allDay: true, className: 'bg-yellow', description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' }, ],
            options = { header: { right: '', center: '', left: '' }, buttonIcons: { prev: 'calendar--prev', next: 'calendar--next' }, theme: false, selectable: true, selectHelper: true, editable: true, events: events, dayClick: function(date) { var isoDate = moment(date).toISOString();
                    $('#new-event').modal('show');
                    $('.new-event--title').val('');
                    $('.new-event--start').val(isoDate);
                    $('.new-event--end').val(isoDate); }, viewRender: function(view) { var calendarDate = $this.fullCalendar('getDate'); var calendarMonth = calendarDate.month();
                    $('.fullcalendar-title').html(view.title); }, eventClick: function(event, element) { $('#edit-event input[value=' + event.className + ']').prop('checked', true);
                    $('#edit-event').modal('show');
                    $('.edit-event--id').val(event.id);
                    $('.edit-event--title').val(event.title);
                    $('.edit-event--description').val(event.description); } };
        $this.fullCalendar(options);
        $('body').on('click', '.new-event--add', function() {
            var eventTitle = $('.new-event--title').val();
            var GenRandom = {
                Stored: [],
                Job: function() {
                    var newId = Date.now().toString().substr(6);
                    if (!this.Check(newId)) { this.Stored.push(newId); return newId; }
                    return this.Job();
                },
                Check: function(id) {
                    for (var i = 0; i < this.Stored.length; i++) { if (this.Stored[i] == id) return true; }
                    return false;
                }
            };
            if (eventTitle != '') { $this.fullCalendar('renderEvent', { id: GenRandom.Job(), title: eventTitle, start: $('.new-event--start').val(), end: $('.new-event--end').val(), allDay: true, className: $('.event-tag input:checked').val() }, true);
                $('.new-event--form')[0].reset();
                $('.new-event--title').closest('.form-group').removeClass('has-danger');
                $('#new-event').modal('hide'); } else { $('.new-event--title').closest('.form-group').addClass('has-danger');
                $('.new-event--title').focus(); }
        });
        $('body').on('click', '[data-calendar]', function() {
            var calendarAction = $(this).data('calendar');
            var currentId = $('.edit-event--id').val();
            var currentTitle = $('.edit-event--title').val();
            var currentDesc = $('.edit-event--description').val();
            var currentClass = $('#edit-event .event-tag input:checked').val();
            var currentEvent = $this.fullCalendar('clientEvents', currentId);
            if (calendarAction === 'update') { if (currentTitle != '') { currentEvent[0].title = currentTitle;
                    currentEvent[0].description = currentDesc;
                    currentEvent[0].className = [currentClass];
                    console.log(currentClass);
                    $this.fullCalendar('updateEvent', currentEvent[0]);
                    $('#edit-event').modal('hide'); } else { $('.edit-event--title').closest('.form-group').addClass('has-error');
                    $('.edit-event--title').focus(); } }
            if (calendarAction === 'delete') { $('#edit-event').modal('hide');
                setTimeout(function() { swal({ title: 'Are you sure?', text: "You won't be able to revert this!", type: 'warning', showCancelButton: true, buttonsStyling: false, confirmButtonClass: 'btn btn-danger', confirmButtonText: 'Yes, delete it!', cancelButtonClass: 'btn btn-secondary' }).then((result) => { if (result.value) { $this.fullCalendar('removeEvents', currentId);
                            swal({ title: 'Deleted!', text: 'The event has been deleted.', type: 'success', buttonsStyling: false, confirmButtonClass: 'btn btn-primary' }); } }) }, 200); }
        });
        $('body').on('click', '[data-calendar-view]', function(e) { e.preventDefault();
            $('[data-calendar-view]').removeClass('active');
            $(this).addClass('active'); var calendarView = $(this).attr('data-calendar-view');
            $this.fullCalendar('changeView', calendarView); });
        $('body').on('click', '.fullcalendar-btn-next', function(e) { e.preventDefault();
            $this.fullCalendar('next'); });
        $('body').on('click', '.fullcalendar-btn-prev', function(e) { e.preventDefault();
            $this.fullCalendar('prev'); });
    }
    if ($calendar.length) { init($calendar); }
})();
'use strict';
var VectorMap = (function() {
    var $vectormap = $('[data-toggle="vectormap"]'),
        colors = { gray: { 100: '#f6f9fc', 200: '#e9ecef', 300: '#dee2e6', 400: '#ced4da', 500: '#adb5bd', 600: '#8898aa', 700: '#525f7f', 800: '#32325d', 900: '#212529' }, theme: { 'default': '#172b4d', 'primary': '#5e72e4', 'secondary': '#f4f5f7', 'info': '#11cdef', 'success': '#2dce89', 'danger': '#f5365c', 'warning': '#fb6340' }, black: '#12263F', white: '#FFFFFF', transparent: 'transparent', };

    function init($this) { var map = $this.data('map'),
            series = { "AU": 760, "BR": 550, "CA": 120, "DE": 1300, "FR": 540, "GB": 690, "GE": 200, "IN": 200, "RO": 600, "RU": 300, "US": 2920, },
            options = { map: map, zoomOnScroll: false, scaleColors: ['#f00', '#0071A4'], normalizeFunction: 'polynomial', hoverOpacity: 0.7, hoverColor: false, backgroundColor: colors.transparent, regionStyle: { initial: { fill: colors.gray[200], "fill-opacity": .8, stroke: 'none', "stroke-width": 0, "stroke-opacity": 1 }, hover: { fill: colors.gray[300], "fill-opacity": .8, cursor: 'pointer' }, selected: { fill: 'yellow' }, selectedHover: {} }, markerStyle: { initial: { fill: colors.theme.warning, "stroke-width": 0 }, hover: { fill: colors.theme.info, "stroke-width": 0 }, }, markers: [{ latLng: [41.90, 12.45], name: 'Vatican City' }, { latLng: [43.73, 7.41], name: 'Monaco' }, { latLng: [35.88, 14.5], name: 'Malta' }, { latLng: [1.3, 103.8], name: 'Singapore' }, { latLng: [1.46, 173.03], name: 'Kiribati' }, { latLng: [-21.13, -175.2], name: 'Tonga' }, { latLng: [15.3, -61.38], name: 'Dominica' }, { latLng: [-20.2, 57.5], name: 'Mauritius' }, { latLng: [26.02, 50.55], name: 'Bahrain' }], series: { regions: [{ values: series, scale: [colors.gray[400], colors.gray[500]], normalizeFunction: 'polynomial' }] }, };
        $this.vectorMap(options);
        $this.find('.jvectormap-zoomin').addClass('btn btn-sm btn-primary');
        $this.find('.jvectormap-zoomout').addClass('btn btn-sm btn-primary'); }
    if ($vectormap.length) { $vectormap.each(function() { init($(this)); }); }
})();
'use strict';
var Lavalamp = (function() {
    var $nav = $('[data-toggle="lavalamp"]');

    function init($this) { var options = { setOnClick: false, enableHover: true, margins: true, autoUpdate: true, duration: 200 };
        $this.lavalamp(options); }
    if ($nav.length) { $nav.each(function() { init($(this)); }); }
})();
'use strict';
var SortList = (function() {
    var $lists = $('[data-toggle="list"]');
    var $listsSort = $('[data-sort]');

    function init($list) { new List($list.get(0), getOptions($list)); }

    function getOptions($list) {
        var options = { valueNames: $list.data('list-values'), listClass: $list.data('list-class') ? $list.data('list-class') : 'list' }
        return options;
    }
    if ($lists.length) { $lists.each(function() { init($(this)); }); }
    $listsSort.on('click', function() { return false; });
})();
'use strict';
var Notify = (function() {
    var $notifyBtn = $('[data-toggle="notify"]');

    function notify(placement, align, icon, type, animIn, animOut) {
        $.notify({ icon: icon, title: ' Bootstrap Notify', message: 'Turning standard Bootstrap alerts into awesome notifications', url: '' }, {
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: { from: placement, align: align },
            offset: { x: 15, y: 15 },
            spacing: 10,
            z_index: 1080,
            delay: 2500,
            timer: 25000,
            url_target: '_blank',
            mouse_over: false,
            animate: { enter: animIn, exit: animOut },
            template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert-notify" role="alert">' +
                '<span class="alert-icon" data-notify="icon"></span> ' +
                '<div class="alert-text"</div> ' +
                '<span class="alert-title" data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '</div>' +
                '<button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '</div>'
        });
    }
    if ($notifyBtn.length) { $notifyBtn.on('click', function(e) { e.preventDefault(); var placement = $(this).attr('data-placement'); var align = $(this).attr('data-align'); var icon = $(this).attr('data-icon'); var type = $(this).attr('data-type'); var animIn = $(this).attr('data-animation-in'); var animOut = $(this).attr('data-animation-out');
            notify(placement, align, icon, type, animIn, animOut); }) }
})();
'use strict';
var OnScreen = (function() {
    var $onscreen = $('[data-toggle="on-screen"]');

    function init($this) { var options = { container: window, direction: 'vertical', doIn: function() {}, doOut: function() {}, tolerance: 200, throttle: 50, toggleClass: 'on-screen', debug: false };
        $this.onScreen(options); }
    if ($onscreen.length) { init($onscreen); }
})();
'use strict';
var QuillEditor = (function() {
    var $quill = $('[data-toggle="quill"]');

    function init($this) { var placeholder = $this.data('quill-placeholder'); var quill = new Quill($this.get(0), { modules: { toolbar: [
                    ['bold', 'italic'],
                    ['link', 'blockquote', 'code', 'image'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                ] }, placeholder: placeholder, theme: 'snow' }); }
    if ($quill.length) { $quill.each(function() { init($(this)); }); }
})();
'use strict';
var Select2 = (function() {
    var $select = $('[data-toggle="select"]');

    function init($this) { var options = {};
        $this.select2(options); }
    if ($select.length) { $select.each(function() { init($(this)); }); }
})();
'use strict';
var Tags = (function() {
    var $tags = $('[data-toggle="tags"]');

    function init($this) { var options = { tagClass: 'badge badge-primary' };
        $this.tagsinput(options); }
    if ($tags.length) { $tags.each(function() { init($(this)); }); }
})();