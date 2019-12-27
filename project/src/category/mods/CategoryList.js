KISSY.add(function(S, Node, Event, XTemplate, Component, MessageBox, XTemplateUtil,
    tpl) {

    var win = window;
    var img_width = 0,
        img_height = 0;

    /**
     * 计算图片大小
     * @returns {Number}
     */
    var calcImgSize = function() {
        var win_width = win.innerWidth;
        if (win_width > 750) {
            win_width = 750;
        }

        var width = (win_width - 7 * 2 - 3 * 4) / 2;
        img_width = width,
            img_height = img_width * 105 / 147;
        return {
            width: img_width,
            height: img_width
        };
    };


    function CategoryList(config) {
        CategoryList.superclass.constructor.call(this, config);
    }

    S.extend(CategoryList, Component);

    UFO.augment(CategoryList, {
        alias: 'categorylist',

        /**
         * 设置图片大小
         */
        setImgSize: function() {
            calcImgSize();
            this.el.all(".category-list .card-item img").css({
                width: img_width,
                height: img_height
            });
        },

        initComponent: function() {
            var data = [{
                    title: '手绘',
                    subtitle: '行走笔尖',
                    img: 'thing_shou_hui.jpg',
                     
                }, {
                    title: '吉他',
                    subtitle: '律动指尖',
                    img: 'thing_ji_ta.jpg',
                     
                }, {
                    title: '英语',
                    subtitle: '英伦交流',
                    img: 'thing_ying_yu.jpg',
                     
                }, {
                    title: '摄影',
                    subtitle: '一米阳光',
                    img: 'thing_she_ying.jpg',
                     
                }, {
                    title: '唱歌',
                    subtitle: '一起狂野',
                    img: 'thing_chang_ge.jpg',
                     
                }, {
                    title: '油画',
                    subtitle: '独享空间',
                    img: 'thing_you_hua.jpg',
                     
                }, {
                    title: '乐器',
                    subtitle: '酷炫风暴',
                    img: 'thing_yue_qi.jpg',
                     
                }, {
                    title: '小语种',
                    subtitle: '旅行必备',
                    img: 'thing_xiao_yu_zhong.jpg',
                     
                }, {
                    title: '彩画',
                    subtitle: '色彩世界',
                    img: 'thing_cai_hua.jpg',
                     
                }, {
                    title: '手工',
                    subtitle: '脑洞大开',
                    img: 'thing_shou_gong.jpg',
                    
                }
            ];

            var me = this;
            this.el = S.all(new XTemplate(tpl, {
                commands: {

                }
            }).render(data));
            this.setImgSize();
            CategoryList.superclass.initComponent.apply(this, arguments);
        },

        addCmpEvents: function() {
            var me = this;

            Event.on(win, "resize", function(event) {
                me.setImgSize();
            });
        }

    });

    return CategoryList;
}, {
    requires: ['node', 'event', "xtemplate", "UFO/Component", "UFO/popup/MessageBox",
        "../../util/XTemplateUtil",
        "../tpl/category-tpl"
    ]
});