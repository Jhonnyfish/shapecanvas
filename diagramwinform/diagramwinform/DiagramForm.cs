using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using diagramwinform.models;
using diagramwinform.utils;
using Newtonsoft.Json;
using Message = System.Windows.Forms.Message;

namespace diagramwinform
{
    public partial class DiagramForm : Form
    {
        public DiagramForm()
        {
            InitializeComponent();
            this._init();
        }

        private Point offsetPoint;
        private WbvRegion wbvRegion = new WbvRegion();

        private async void _init()
        {
            await wbvDiagram.EnsureCoreWebView2Async();
            Console.WriteLine(ConstOfPath.BasePath);
            wbvDiagram.Source = new Uri("file:///D:/LeBaiTu/shapecanvas/algorithmflow/dist/index.html");
            //wbvDiagram.Source = new Uri("file:///D:/LeBaiTu/diagramwinform/diagramwinform/diagramwinform/diagram.html");
        }

        private void addEl_Click(object sender, EventArgs e)
        {
            Console.WriteLine("添加元素到wbv2");
            wbvDiagram.CoreWebView2.PostWebMessageAsString("myApp.Algorithm");
        }

        private void labShape_MouseMove(object sender, MouseEventArgs e)
        {
            ((Control)sender).Cursor = Cursors.Arrow;
            if (e.Button == MouseButtons.Left)
            {
                // webview的相对位置
                wbvRegion.xMin = wbvDiagram.Location.X;
                wbvRegion.yMin = wbvDiagram.Location.Y;
                wbvRegion.xMax = wbvRegion.xMin + wbvDiagram.Size.Width;
                wbvRegion.yMax = wbvRegion.yMin + wbvDiagram.Size.Height;
                Point screenPos = new Point(Control.MousePosition.X, Control.MousePosition.Y);
                Point formPos = PointToClient(screenPos);
                //label的偏移量
                screenPos.Offset(offsetPoint.X, offsetPoint.Y);
                formPos.Offset(offsetPoint.X, offsetPoint.Y);
                ((Control)sender).Location = ((Control)sender).Parent.PointToClient(screenPos);
            }
        }

        private void labShape_MouseDown(object sender, MouseEventArgs e)
        {
            offsetPoint = new Point(-e.X, -e.Y);
            //string pointStr = $"{-e.X},{-e.Y}";
            //wbvDiagram.CoreWebView2.PostWebMessageAsString(pointStr);
        }

        private void labShape_MouseUp(object sender, MouseEventArgs e)
        {
            Point screenPos = new Point(Control.MousePosition.X, Control.MousePosition.Y);
            Point formPos = PointToClient(screenPos);
            Point wbvPoint = new Point();

            if (PointUtil.IsInWbv(formPos, wbvRegion, ref wbvPoint))
            {
                ShapePoint shapeMessage = new ShapePoint();
                shapeMessage.X = wbvPoint.X;
                shapeMessage.Y = wbvPoint.Y;
                shapeMessage.ShapeType = "myApp.Algorithm";
                string msg = JsonConvert.SerializeObject(shapeMessage);
                Console.WriteLine(msg);
                wbvDiagram.CoreWebView2.PostWebMessageAsJson(msg);
            }
            else
            {
                Console.WriteLine(@"控件没有被拖动至wbv中");
            }
        }
    }
}