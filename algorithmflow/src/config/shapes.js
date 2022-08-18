import { V } from '../../build/package/rappid'

var inport = {
    position: {
        name: 'left'
    },
    label: {
        position: {
            name: 'in'
        },
        markup: [{
            tagName: 'text',
            selector: 'label'
        }]
    },
    attrs: {
        portBody: {
            magnet: true,
            width: 16,
            height: 16,
            x: -8,
            y: -8,
            fill: '#FE854F'
        },
        label: {
        }
    },
    markup: [{
        tagName: 'rect',
        selector: 'portBody'
    }]
}
var outport = {
    position: {
        name: 'right'
    },
    label: {
        position: {
            name: 'out'
        },
        markup: [{
            tagName: 'text',
            selector: 'label'
        }]
    },
    attrs: {
        portBody: {
            magnet: true,
            width: 16,
            height: 16,
            x: -8,
            y: -8,
            fill: '#FE854F'
        },
        label: {

        }
    },
    markup: [{
        tagName: 'rect',
        selector: 'portBody'
    }]
}

export function createModel() {
    var model = new joint.shapes.standard.Rectangle({
        size: { width: 90, height: 90 },
        attrs: {
            body: {
                fill: '#8ECAE8'
            }
        },
        ports: {
            groups: {
                'in': inport,
                'out': outport
            }
        }
    })
    model.addPorts([
        {
            group: 'in'
        },
        {
            group: 'in'
        },
        {
            group: 'out'
        },
        {
            group: 'out'
        }
    ])
    return model
}

export function defineMyShape() {
    joint.dia.Element.define('myApp.MyShape', {
        attrs: {
            body: {
                refWidth: '100%',
                refHeight: '100%',
                strokeWidth: 2,
                stroke: '#000000',
                fill: '#FE854F'
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 14,
                fill: '#333333',
                text: "自定义输入输出"
            },
            root: {
                magnet: false // Disable the possibility to connect the body of our shape. Only ports can be connected.
            }
        },
        level: 10,
        ports: {
            groups: {
                'in': {
                    markup: [{
                        tagName: 'rect',
                        selector: 'portBody',
                        // attributes: { r: 12 }
                    }],
                    z: -1,
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: '#FFFFFF',
                            width: 15,
                            height: 15,
                            x: -10,
                            y: -7
                        }
                    },
                    position: { name: 'left' },
                    label: { position: { name: 'left' } }
                },
                'out': {
                    markup: [{
                        tagName: 'circle',
                        selector: 'portBody',
                        attributes: { r: 12 }
                    }],
                    z: -1,
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: '#7C68FC'
                        }
                    },
                    position: { name: 'right' },
                    label: { position: { name: 'right' } }
                }
            }
        }
    }, {
        markup: [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label'
        }]
    })
    joint.util.measureText = function (text, attrs) {

        var fontSize = parseInt(attrs.fontSize, 10) || 10;

        var svgDocument = V('svg').node;
        var textElement = V('<text><tspan></tspan></text>').node;
        var textSpan = textElement.firstChild;
        var textNode = document.createTextNode('');

        textSpan.appendChild(textNode);
        svgDocument.appendChild(textElement);
        document.body.appendChild(svgDocument);

        var lines = (text || "").split('\n');
        var width = 0;

        // Find the longest line width.
        _.each(lines, function (line) {

            textNode.data = line;
            var lineWidth = textSpan.getComputedTextLength();

            width = Math.max(width, lineWidth);
        });

        var height = lines.length * (fontSize * 1.2);

        V(svgDocument).remove();

        return { width: width, height: height };
    };
    joint.dia.Element.define('myApp.Question', {
        optionHeight: 30,
        questionHeight: 45,
        paddingBottom: 30,
        minWidth: 150,
        question: null,
        ports: {
            groups: {
                'in': {
                    position: 'top',
                    attrs: {
                        circle: {
                            magnet: 'passive',
                            stroke: 'white',
                            fill: '#feb663',
                            r: 14
                        },
                        text: {
                            pointerEvents: 'none',
                            fontSize: 12,
                            fill: 'white'
                        }
                    },
                    label: {
                        position: {
                            name: 'left',
                            args: { x: 5 }
                        }
                    }
                },
                out: {
                    position: 'right',
                    attrs: {
                        'circle': {
                            magnet: true,
                            stroke: 'none',
                            fill: '#31d0c6',
                            r: 10
                        }
                    }
                }
            },
            items: [{
                group: 'in',
                attrs: {
                    text: { text: 'in' }
                }
            }]
        },
        attrs: {
            '.': {
                magnet: false
            },
            '.body': {
                refWidth: '100%',
                refHeight: '100%',
                rx: '1%',
                ry: '2%',
                stroke: 'none',
                fill: {
                    type: 'linearGradient',
                    stops: [
                        { offset: '0%', color: '#FEB663' },
                        { offset: '100%', color: '#31D0C6' }
                    ],
                    // Top-to-bottom gradient.
                    attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                }
            },
            '.btn-add-option': {
                refX: 10,
                refDy: -22,
                cursor: 'pointer',
                fill: 'white'
            },
            '.btn-remove-option': {
                xAlignment: 10,
                yAlignment: 13,
                cursor: 'pointer',
                fill: 'white'
            },
            '.options': {
                refX: 0
            },

            // Text styling.
            text: {
                fontFamily: 'Arial'
            },
            '.option-text': {
                fontSize: 11,
                fill: '#4b4a67',
                refX: 30,
                yAlignment: 'middle'
            },
            '.question-text': {
                fill: 'white',
                refX: '50%',
                refY: 15,
                fontSize: 15,
                textAnchor: 'middle',
                style: {
                    textShadow: '1px 1px 0px gray'
                }
            },

            // Options styling.
            '.option-rect': {
                rx: 3,
                ry: 3,
                stroke: 'white',
                strokeWidth: 1,
                strokeOpacity: .5,
                fillOpacity: .5,
                fill: 'white',
                refWidth: '100%'
            }
        }
    },
        {

            markup: '<rect class="body"/><text class="question-text"/><g class="options"></g><path class="btn-add-option" d="M5,0 10,0 10,5 15,5 15,10 10,10 10,15 5,15 5,10 0,10 0,5 5,5z"/>',
            optionMarkup: '<g class="option"><rect class="option-rect"/><path class="btn-remove-option" d="M0,0 15,0 15,5 0,5z"/><text class="option-text"/></g>',

            initialize: function () {

                joint.dia.Element.prototype.initialize.apply(this, arguments);
                this.on('change:options', this.onChangeOptions, this);
                this.on('change:question', function () {
                    this.attr('.question-text/text', this.get('question') || '');
                    this.autoresize();
                }, this);

                this.on('change:questionHeight', function () {
                    this.attr('.options/refY', this.get('questionHeight'), { silent: true });
                    this.autoresize();
                }, this);

                this.on('change:optionHeight', this.autoresize, this);

                this.attr('.options/refY', this.get('questionHeight'), { silent: true });
                this.attr('.question-text/text', this.get('question'), { silent: true });

                this.onChangeOptions();
            },

            onChangeOptions: function () {

                var options = this.get('options');
                var optionHeight = this.get('optionHeight');

                // First clean up the previously set attrs for the old options object.
                // We mark every new attribute object with the `dynamic` flag set to `true`.
                // This is how we recognize previously set attributes.
                var attrs = this.get('attrs');
                _.each(attrs, function (attrs, selector) {

                    if (attrs.dynamic) {
                        // Remove silently because we're going to update `attrs`
                        // later in this method anyway.
                        this.removeAttr(selector, { silent: true });
                    }
                }.bind(this));

                // Collect new attrs for the new options.
                var offsetY = 0;
                var attrsUpdate = {};
                var questionHeight = this.get('questionHeight');

                _.each(options, function (option) {

                    var selector = '.option-' + option.id;

                    attrsUpdate[selector] = { transform: 'translate(0, ' + offsetY + ')', dynamic: true };
                    attrsUpdate[selector + ' .option-rect'] = { height: optionHeight, dynamic: true };
                    attrsUpdate[selector + ' .option-text'] = { text: option.text, dynamic: true, refY: optionHeight / 2 };

                    offsetY += optionHeight;

                    var portY = offsetY - optionHeight / 2 + questionHeight;
                    if (!this.getPort(option.id)) {
                        this.addPort({ group: 'out', id: option.id, args: { y: portY } });
                    } else {
                        this.portProp(option.id, 'args/y', portY);
                    }
                }.bind(this));

                this.attr(attrsUpdate);
                this.autoresize();
            },

            autoresize: function () {

                var options = this.get('options') || [];
                var gap = this.get('paddingBottom') || 20;
                var height = options.length * this.get('optionHeight') + this.get('questionHeight') + gap;
                var width = joint.util.measureText(this.get('question'), {
                    fontSize: this.attr('.question-text/fontSize')
                }).width;
                this.resize(Math.max(this.get('minWidth') || 150, width), height);
            },
            addOption: function (option) {

                var options = JSON.parse(JSON.stringify(this.get('options')));
                options.push(option);
                this.set('options', options);
            },

            removeOption: function (id) {

                var options = JSON.parse(JSON.stringify(this.get('options')));
                this.removePort(id);
                this.set('options', _.without(options, _.find(options, { id: id })));
            },

            changeOption: function (id, option) {

                if (!option.id) {
                    option.id = id;
                }

                var options = JSON.parse(JSON.stringify(this.get('options')));
                options[_.findIndex(options, { id: id })] = option;
                this.set('options', options);
            }
        });
    joint.shapes.myApp.QuestionView = joint.dia.ElementView.extend({

        events: {
            'click .btn-add-option': 'onAddOption',
            'click .btn-remove-option': 'onRemoveOption'
        },

        presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
            options: ['OPTIONS']
        }),

        confirmUpdate: function (flags) {
            joint.dia.ElementView.prototype.confirmUpdate.apply(this, arguments);
            if (this.hasFlag(flags, 'OPTIONS')) this.renderOptions();
        },

        renderMarkup: function () {

            joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

            // A holder for all the options.
            this.$options = this.$('.options');
            // Create an SVG element representing one option. This element will
            // be cloned in order to create more options.
            this.elOption = V(this.model.optionMarkup);

            this.renderOptions();
        },

        renderOptions: function () {

            this.$options.empty();

            _.each(this.model.get('options'), function (option, index) {

                var className = 'option-' + option.id;
                var elOption = this.elOption.clone().addClass(className);
                elOption.attr('option-id', option.id);
                this.$options.append(elOption.node);

            }.bind(this));

            // Apply `attrs` to the newly created SVG elements.
            this.update();
        },

        onAddOption: function () {

            this.model.addOption({
                id: _.uniqueId('option-'),
                text: 'Option ' + this.model.get('options').length
            });
        },

        onRemoveOption: function (evt) {

            this.model.removeOption(V(evt.target.parentNode).attr('option-id'));
        }
    });
}

export function createMyShape() {
    return new joint.shapes.myApp.MyShape({
        size: { width: 200, height: 100 },
        position: { x: 50, y: 50 },
        attrs: { label: { text: 'My Shape' } },
        level: 2,
        ports: { items: [{ id: 'in1', group: 'in' }, { group: 'out', id: 'out1' }] }
    });
}
export function createMyShape2() {
    return new joint.shapes.myApp.Question({
        position: { x: 400 - 50, y: 30 },
        size: { width: 100, height: 70 },
        question: "QUESTION",
        inPorts: [{ id: 'in', label: 'In' }, { id: 'in2', label: 'In2' }],
        options: [
            { id: 'yes', text: 'Yes' },
            { id: 'no', text: 'No' },
            { id: 'no1', text: 'N2o' }
        ]
    });
}