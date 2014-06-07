module.exports = function(grunt) {
    grunt.initConfig({
        coffee: {
            compile: {
                expand: true,
                cwd: './src/resources/app/coffee',
                src: ['**/*.coffee'],
                dest: './src/js',
                ext: '.js'
            }
        },
        less: {
            compile: {
                expand: true,
                cwd: './app/resources/app/less',
                src: ['**/*.less'],
                dest: './src/css',
                ext: '.css'
            }
        },
        watch: {
            stylesheets: {
                files: '**/*.less',
                tasks: ['less']
            },
            scripts: {
                files: '**/*.coffee',
                tasks: ['coffee']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'coffee', 'watch']);
}