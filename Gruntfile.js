module.exports = function (grunt) {
  var task = grunt.task;
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dest: "build",
   //dest: '../hlj-mobile/lib/ufo',
    src: 'src',
    // 对build目录进行清理
    clean: {
        main: {
        	files:[
   				{
   				    src: '<%= dest%>'
   				}
           ]
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
	                  'resources/**/*.*'
                    ], 
                    dest: '<%= dest%>'
                }
                
                
            ]
        }
    },
	/**
	 * 编译sass
	 */
	sass: {
        dest: {
            files: {
            	'<%= dest%>/resources/css/ufo.css': '<%= src%>/resources/scss/ufo.scss'
            }
           
        }
		/*dest: {
	      files: [{
	        expand: true,
	        cwd: '<%= src%>/resources/scss',
	        src: ['*.scss'],
	        dest: '<%= dest%>/resources/css',
	        ext: '.css'
	      }]
	    }*/
    },
    
  
    //压缩JS
    uglify: {
	    options: {
	      banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	    },
	    build: {//按原文件结构压缩dest文件夹内所有JS文件
            files: [{
                expand:true,
                cwd:'<%= src%>',//dest目录下
                src:'**/*.js',//所有js文件
                dest: '<%= dest%>'//输出到此目录下
            }]
        } 
	},
	
	/*
	 * 压缩CSS
	 */
	cssmin: {
		options : { 
	        compatibility : 'ie8', //设置兼容模式 
	        noAdvanced : true //取消高级特性 
	    },
		target: {
    	  files: [{
              expand:true,
              cwd:'<%= dest%>',//dest目录下
              src:'resources/**/*.css',//所有css文件
              dest: '<%= dest%>',//输出到此目录下
              ext: '.min.css'
          }]
      
      }
    },
    
    /*
     * 监控
     */
    watch: {
        scripts: {
            files: [
                '<%= src%>/resources/scss/*.scss'
            ],
            tasks: ['sass']
        }
    }
    
  
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-kmc');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  grunt.registerTask('build', ['clean','sass', 'copy', 'uglify', 'cssmin']);
  return grunt.registerTask('default', '默认流程', function(type) {
	  task.run(['clean','copy', 'sass', 'uglify']);
	});
}
