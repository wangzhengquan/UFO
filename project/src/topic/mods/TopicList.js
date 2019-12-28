KISSY.add(function(S, Node, Event, XTemplate, 
    Component, MessageBox, app, tpl, UFO, mycss) {
    function PersonList(config) {

        PersonList.superclass.constructor.call(this, config);

    }

    S.extend(PersonList, Component);

    UFO.augment(PersonList, {
        alias: 'topiclist',

        initComponent: function() {
            var me = this;
            var data = [
                
                {
                    title: '炫酷大玩咖',
                    subtitle: '和有趣的人一起参与丰富好玩的线下活动',
                    img: 'topic1.jpg'
                     
                }, {
                    title: '绘画艺术家',
                    subtitle: '源于自然，发于内心的艺术作品创作者',
                    img: 'topic2.jpg',
                      
                }, {
                    title: '独立音乐人',
                    subtitle: "Let's Go 让我们一起狂欢、一起共舞",
                    img: 'topic3.jpg'
                     
                }, {
                    title: '流利口语家',
                    subtitle: '和歪国人一起交换彼此思想的世界',
                    img: 'topic4.jpg'
                     
                }, {
                    title: '潮牌摄影师',
                    subtitle: '留住青春美好，记录最灿烂的自己',
                    img: 'topic5.jpg'
                     
                }


            ];
            this.el = S.all(new XTemplate(tpl, {
                commands: {
                    'getPersonHref': function(scopes, option) {
                        MessageBox.alert('alert', 'You are nice!');
                        return url;
                    }
                }

            }).render(data));
            PersonList.superclass.initComponent.apply(this, arguments);
        },

        doSearchArtisan: function(keyword) {
            MessageBox.alert('alert', 'You are nice!');
        },

        addCmpEvents: function() {
            var me = this;
            //搜素
            /*this.el.one('form.form-search').on('submit', function(event){
            	var text = S.one(event.currentTarget).one('input[type=search]').getDOMNode(),
            		 value = S.trim(text.value);
            	text.blur();
            	me.doSearchArtisan(value); 
            });*/


            this.el.delegate('click', '.artisan-list a.item', function(event) {
                MessageBox.alert('alert', 'You are nice!');
                return false;
            });
        }

    });

    return PersonList;
}, {
    requires: ['node', 'event', "xtemplate", "UFO/Component",
        "UFO/popup/MessageBox",
        "../../app",
        "../tpl/topic-list-tpl",
        "UFO/UFO",
        "css/topiclist.css"
    ]
});
