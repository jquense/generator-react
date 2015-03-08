'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay')
  , npmName = require('npm-name');

var ReactGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  askForModuleName: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('React generator!'));

    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd())
    },
    {
      type: 'confirm',
      name: 'pkgName',
      message: 'The name above already exists on npm, choose another?',
      default: true,
      when: function (answers){
        var done = this.async()

        npmName(answers.name, function gotNPMName(err, available){
          done(!available)
        })
      }
    }];

    this.prompt(prompts, function (props) {
      if (props.pkgName)
        return this.askForModuleName()
      
      this.slugname = this._.slugify(props.name);
      this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
        return g[1].toUpperCase();
      });

      this.repoUrl = 'jquense/'+ this.slugname

      done();
    }.bind(this));
  },

  askFor: function askFor(){
    var cb = this.async()
      , prompts

    prompts = [{
      name: 'description', 
      message: 'Description', 
    },
    {
      name: 'keywords', 
      message: 'Key your keywords (comma to split)'
    }]

    this.currentYear = (new Date()).getFullYear()

    this.prompt(prompts, function onPrompt(props){

      if ( props.keywords.trim() )
        this.keywords = props.keywords.split(',').map(function (el){
          return el.trim()
        })
      else 
        this.keywords = [];
      
      this.props = props

      cb()
    }.bind(this))
  },

  writing: {

    app: function () {
      //this.config.save()

      this.mkdir('lib')
      this.mkdir('src')
      this.mkdir('src/util')
      this.mkdir('src/mixins')
      this.mkdir('src/less')
      this.write('src/less/styles.less', '')

      this.write('index.js', '')

      this.mkdir('test')
      this.copy('test.js', 'test.js')

      this.template('_package.json', 'package.json')
    },

    projectfiles: function () {
      this.template('README.md', 'README.md')
      this.copy('eslintrc', '.eslintrc')
      this.copy('npmignore', '.npmignore')

      this.copy('License.txt', 'License.txt')
      this.copy('gulpfile.js', 'gulpfile.js')
      this.copy('karma.conf.js', 'karma.conf.js')
      this.copy('webpack.configs.js', 'webpack.configs.js')

      this.directory('dev', 'dev')
      this.directory('vendor', 'vendor')
    }
  },

  end: function () {
    this.installDependencies({
      bower: false, 
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = ReactGenerator;