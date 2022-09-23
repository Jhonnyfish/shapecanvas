import { objectToString } from "@vue/shared";
import { V } from "../../build/package/rappid";
import {getMessageStr} from "../config/messageHandler"
export function defineMyShape() {
  joint.util.measureText = function (text, attrs) {
    var fontSize = parseInt(attrs.fontSize, 10) || 10;

    var svgDocument = V("svg").node;
    var textElement = V("<text><tspan></tspan></text>").node;
    var textSpan = textElement.firstChild;
    var textNode = document.createTextNode("");
    textSpan.appendChild(textNode);
    svgDocument.appendChild(textElement);
    document.body.appendChild(svgDocument);

    var lines = (text || "").split("\n");
    var width = 0;

    // Find the longest line width.
    _.each(lines, function (line) {
      textNode.data = line;
      var lineWidth = textSpan.getComputedTextLength();
      width = Math.max(width, lineWidth);
    });

    var height = lines.length * (fontSize * 1.5);

    V(svgDocument).remove();
    return { width: width, height: height };
  };
 joint.dia.Element.define(
    'myApp.Algorithm',
    {
      optionHeight: 30,
      algorithmHeight: 35,
      paddingBottom: 30,
      minWidth: 150,
      name: null,
      ports: {
        groups: {
          in: {
            position: "left",
            attrs: {
              circle: {
                magnet: "passive", //只可以被指向
                stroke: "none",
                fill: "#FFEFD5",
                r: 10,
              },
            },
          },
          out: {
            position: "right",
            attrs: {
              circle: {
                magnet: true,
                stroke: "none",
                fill: "#87CEFA",
                r: 10,
              },
            },
          },
        },
      },
      attrs: {
        ".": {
          magnet: false,
        },
        ".body": {
          refWidth: "100%", //相对的宽度
          refHeight: "100%",
          rx: "1%", //圆角
          ry: "1%",
          stroke: "none",
          fill: "#87CEFA",
        },
        ".btn-add-outport": {
          refX: 120,
          refDy: -22,
          cursor: "pointer",
          fill: "white",
        },
        ".btn-add-inport": {
          refX: 10,
          refDy: -22,
          cursor: "pointer",
          fill: "white",
        },
        ".btn-fold-option":{
          refX: 20,
          refY: 15,
          cusrsor:"pointer",
          fill:"white",
        },
        ".btn-remove-option": {
          xAlignment: 20,
          yAlignment: 13,
          cursor: "pointer",
          fill: "white",
        },
        ".options": {
          refX: 0
        },
        // Text styling.
        text: {
          fontFamily: "Arial",
        },
        ".option-name": {
          fontSize: 11,
          fill: "#4b4a67",
          refX: 50,
          yAlignment: "middle",
          cursor:'pointer'
        },
        ".algorithm-text": {
          fill: "white",
          refX: "50%",
          refY: 15,
          fontSize: 15,
          textAnchor: "middle",
          style: {
            textShadow: "1px 1px 0px gray",
          },
          cursor:"pointer"
        },

        // Options styling.
        ".option-rect": {
          rx: 3,
          ry: 3,
          stroke: "white",
          strokeWidth: 1,
          strokeOpacity: 0.5,
          fillOpacity: 0.5,
          fill: "white",
          refWidth: "100%",
          cursor:"pointer"
        },
        //Option selected
        ".option-select":{
          rx: 3,
          ry: 3,
          stroke: "white",
          strokeWidth: 1,
          strokeOpacity: 0.5,
          fillOpacity: 0.5,
          fill: "black",
          refWidth: "100%",
          cursor:"pointer"
        }
      },
    },
    {
      markup:
        '<rect class="body"/><text class="algorithm-text"/><g class="options"/><path class="btn-add-outport" d="M5,0 10,0 10,5 15,5 15,10 10,10 10,15 5,15 5,10 0,10 0,5 5,5z"/><path class="btn-add-inport" d="M5,0 10,0 10,5 15,5 15,10 10,10 10,15 5,15 5,10 0,10 0,5 5,5z"/>',
      optionMarkup:
        '<g class="option"><rect class="option-rect"/><path class="btn-remove-option" d="M0,0 15,0 15,5 0,5z"/><text class="option-name"/></g>',
      initialize: function () {
        joint.dia.Element.prototype.initialize.apply(this,arguments);
        //在这个自定义的图形对象上注册事件
        //监听options，如果options发生任何变化，就执行函数
        this.on("change:options", this.onChangeOptions, this);
        this.on(
          "change:name",
          function () {
            this.attr(".algorithm-text/text", this.get("name") || "");
            this.autoresize();
          },
          this.on()
        );

        this.on(
          "change:algorithmHeight",
          function () {
            this.attr(".options/refY", this.get("algorithmHeight"), {
              silent: true,
            });
            this.autoresize();
          },
          this
        );
        this.on("change:optionHeight", this.autoresize, this);
        this.attr(".options/refY", this.get("algorithmHeight"), {
          silent: true,
        });
        this.attr(".algorithm-text/text", this.get("name"), { silent: true });
        this.onChangeOptions();
      },
      // callback functions
      onChangeOptions: function () {
        var options = this.get("options");
        var optionHeight = this.get("optionHeight");
        // First clean up the previously set attrs for the old options object.
        // We mark every new attribute object with the `dynamic` flag set to `true`.
        // This is how we recognize previously set attributes.
        var attrs = this.get("attrs");
        _.each(
          attrs,
          function (attrs, selector) {
            if (attrs.dynamic) {
              // Remove silently because we're going to update `attrs`
              // later in this method anyway.
              this.removeAttr(selector, { silent: true });
            }
          }.bind(this)
        );
        // Collect new attrs for the new options.
        var offsetY = 0;
        var attrsUpdate = {};
        var algorithmHeight = this.get("algorithmHeight");
        _.each(
          options,
          function (option) {
            var selector = ".option-" + option.id;
            attrsUpdate[selector] = {
              transform: "translate(0, " + offsetY + ")",
              dynamic: true,
            };
            attrsUpdate[selector + " .option-rect"] = {
              height: optionHeight,
              dynamic: true,
            };
            attrsUpdate[selector + " .option-name"] = {
              text: option.name,
              dynamic: true,
              refY: optionHeight / 2,
            };
            offsetY += optionHeight;
            var portY = offsetY - optionHeight / 2 + algorithmHeight;
            if (!this.getPort(option.id)) {
              if (option.style == "out")
                this.addPort({
                  group: "out",
                  id: option.id,
                  args: { y: portY },
                });
              else
                this.addPort({
                  group: "in",
                  id: option.id,
                  args: { y: portY },
                });
            } else {
              this.portProp(option.id, "args/y", portY);
            }
          }.bind(this)
        );
        this.attr(attrsUpdate);
        this.autosort();
        this.autoresize();
      },

      autoresize: function () {
        var options = this.get("options") || [];
        var gap = this.get("paddingBottom") || 20;
        var height =
          options.length * this.get("optionHeight") +
          this.get("algorithmHeight") +
          gap;
        var width = joint.util.measureText(this.get("algorithm"), {
          fontSize: this.attr(".algorithm-text/fontSize"),
        }).width;
        this.resize(Math.max(this.get("minWidth") || 150, width), height);
      },
      autosort: function () {
        var options = this.get("options") || [];
        var aftersort = [];
        _.each(options, function (option) {
          if (option.style == "in") aftersort.push(option);
        });
        _.each(options, function (option) {
          if (option.style == "out") aftersort.push(option);
        });
        var json = JSON.parse(JSON.stringify(aftersort));
        this.set("options", json);
      },
      addOption: function (option) {
        var options = JSON.parse(JSON.stringify(this.get("options")));
        options.push(option);
        this.set("options", options);
        // var optionProperty = {
        //   id: option.id,
        //   code: "Undefined",
        //   name: "Undefined",
        //   description: "Undefined",
        // };
        // if (option.style == "in")
        //   this.attributes.inputproperties.push(optionProperty);
        // else this.attributes.outputproperties.push(optionProperty);
      },
      removeOption: function (id) {
        var options = JSON.parse(JSON.stringify(this.get("options")));
        this.removePort(id);
        this.set("options", _.without(options, _.find(options, { id: id })));
      },
      // changeOption: function (id, option) {
      //   if (!option.id) {
      //     option.id = id;
      //   }
      //   var options = JSON.parse(JSON.stringify(this.get("options")));
      //   options[_.findIndex(options, { id: id })] = option;
      //   this.set("options", options);
      // },
    }
  );
  // View 派生自backbone.view
  joint.shapes.myApp.AlgorithmView = joint.dia.ElementView.extend({
    //View Events
    events: {
      "click .btn-add-outport": "onAddOutPort",
      "click .btn-remove-option": "onRemoveOption",
      "click .btn-add-inport": "onAddInPort",
      "mouseover .option-rect":"onMouseOverOption",
      "mouseleave .option-rect":"onMouseleaveOption",
      "mousedown .option-rect":"onMouseDonwOption",
      
    },

    presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
      options: ["OPTIONS"],
    }),

    confirmUpdate: function (flags) {
      joint.dia.ElementView.prototype.confirmUpdate.apply(this, arguments);
      if (this.hasFlag(flags, "OPTIONS")) this.renderOptions();
    },

    renderMarkup: function () {
      joint.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

      // A holder for all the options.
      this.$options = this.$(".options");
      // Create an SVG element representing one option. This element will
      // be cloned in order to create more options.
      this.elOption = V(this.model.optionMarkup);
      this.renderOptions();
    },

    renderOptions: function () {
      this.$options.empty();

      _.each(
        this.model.get("options"),
        function (option) {
          var className = "option-" + option.id;
          var elOption = this.elOption.clone().addClass(className);
          elOption.attr("option-id", option.id);
          this.$options.append(elOption.node);
        }.bind(this)
      );
      // Apply `attrs` to the newly created SVG elements.
      this.update();
    },

    onAddOutPort: function () {
      var outcount = this.model.get("options").length + 1;
      this.model.addOption({
        id: _.uniqueId("out-"),
        text: "输出",
        code:"undefined",
        style: "out",
        //todo 排序标识 index-display
      });
    },

    onAddInPort: function () {
      var incount = this.model.get("options").length + 1;
      this.model.addOption({
        id: _.uniqueId("in-"),
        text: "输入",
        code:"undefined",
        style: "in",
        //todo 排序标识 index-display
      });
    },

    onRemoveOption: function (evt) {
      this.model.removeOption(V(evt.target.parentNode).attr("option-id"));
    },
    onMouseOverOption:function(evt){
      // console.log(V(evt.target.parentNode).attr("option-id"))
      evt.target.setAttribute("fill","#B0C4DE")
    },
    onMouseleaveOption:function(evt){
      // console.log(V(evt.target.parentNode).attr("option-id"))
      evt.target.setAttribute("fill","white")
    },
    onMouseDonwOption:function(evt){
      if(evt.button==2){
        var optionId = V(evt.target.parentNode).attr("option-id")
        var options = this.model.attributes.options
        var option = options.find(function(option){
          if(option.id==optionId)
              return option
        })
        var msgBody = {
          X:evt.clientX,
          Y:evt.clientY,
          id:this.model.id,
          code:option.code,
          style:option.style
        }
        window.chrome.webview.postMessage(getMessageStr("rightClickOption",JSON.stringify(msgBody)))
      }
    }
  });
}