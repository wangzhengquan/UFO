module.exports = function (grunt) {
  var task = grunt.task;
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: 'build',
    src: 'src',
    // 对build目录进行清理
    clean: {
      main: {
        files:[
          {
            src: '<%= dist%>'
          }
        ]
      }
    },

    kmc: {
      options: {
        // depFilePath: 'map.js',
        comboOnly: false,
        fixModuleName:false,
        // comboMap: true,
        /*
        * 选项为true的时候，kmc会把src的文件拷贝到dest后再添加模块名。
        * 为false的时候，会直接在用户配置的src中的文件添加模块名。
        */
        copyAssets: true,
        ///*这里配置的路径是以工程目录为基准，项目里的config.js是以浏览器访问路径为基准*/
        packages: [{
          name: 'app',
          path: '<%= src%>/',
          charset:'utf-8',
          ignorePackageNameInUri:true
        },{
          name: 'UFO',
          path: '../src',
          charset:'utf-8',
          ignorePackageNameInUri:true
        },{
          name: 'mui',
          path:"../lib/kissy_mui",
          charset:'utf-8',
          ignorePackageNameInUri:true
        }]
      },
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= src%>/',
            src: [
              'app.js',              

              'example/mods/ArtisanDetail.js',
              'example/mods/ArtisanList.js',
              'example/mods/ArtisanListViewport.js',

              'home/mods/HomeTabPanel.js',
              'home/mods/HomeTabSlider.js',

              'home/mods/ProductListTab.js',
              'home/mods/CategoryTab.js',
              'home/mods/TopicTab.js',

              'product/mods/ListViewport.js',


            ],
            dest: '<%= dist%>'
          }
        ]
      }
    },

    sass: {
      dest: {
        files: [{
          expand: true,
          cwd: '<%= src%>/resources/scss',
          src: ['*.scss',  '!_*.scss', '!share.scss', '!global.scss'],
          dest: '<%= src%>/resources/css',
          ext: '.css'
        }]
      }

    },

    watch: {
      scripts: {
        files: [
          '<%= src%>/resources/scss/*.scss'
        ],
        tasks: ['sass']
      }
    },

    /*拷贝*/
    copy: {
      main: {
        files: [
          {
            expand:true,
            cwd:'<%= src%>',
            src: [
              '**/*.html',
              '**/*.json',
              '!**/*.tpl.html',
              'resources/**/*.*',
              '!resources/**/*.scss',
              'config.js'
              
            ],
            dest: '<%= dist%>'
          }


        ]
      }
    },

    //压缩JS
    uglify: {
      options: {
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {//按原文件结构压缩dest文件夹内所有JS文件
        files: [{
          expand:true,
          cwd:'<%= dist%>',//dest目录下
          src:'**/*.js',//所有js文件
          dest: '<%= dist%>'//输出到此目录下
        }]
      }
    },

    //压缩CSS
    cssmin: {
      options : {
        compatibility : 'ie8', //设置兼容模式
        noAdvanced : true //取消高级特性
      },
      target: {
        files: [{
          expand:true,
          cwd:'<%= dist%>',//dest目录下
          src:'resources/**/*.css',//所有css文件
          dest: '<%= dist%>'//输出到此目录下
          //ext: '.min.css'
        }]
      }
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {expand: true, cwd: '<%= dist%>', src: ['**/*.html'], dest: '<%= dist%>'}
        ]
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-kmc');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  //grunt.registerTask('default', ['cssmin']);
  grunt.registerTask('build', ['clean','sass', 'kmc', 'copy', 'uglify', 'cssmin', 'htmlmin']);
  return grunt.registerTask('default', '默认流程', function(type) {
    task.run(['clean','kmc', 'copy', 'uglify', 'cssmin', 'htmlmin']);
  });
}
