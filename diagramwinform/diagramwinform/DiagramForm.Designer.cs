namespace diagramwinform
{
    partial class DiagramForm
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.addEl = new System.Windows.Forms.Button();
            this.wbvDiagram = new Microsoft.Web.WebView2.WinForms.WebView2();
            this.labShape = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.wbvDiagram)).BeginInit();
            this.SuspendLayout();
            // 
            // addEl
            // 
            this.addEl.Location = new System.Drawing.Point(111, 455);
            this.addEl.Name = "addEl";
            this.addEl.Size = new System.Drawing.Size(187, 23);
            this.addEl.TabIndex = 0;
            this.addEl.Text = "addElToWbv";
            this.addEl.UseVisualStyleBackColor = true;
            this.addEl.Click += new System.EventHandler(this.addEl_Click);
            // 
            // wbvDiagram
            // 
            this.wbvDiagram.AllowExternalDrop = true;
            this.wbvDiagram.CreationProperties = null;
            this.wbvDiagram.DefaultBackgroundColor = System.Drawing.Color.White;
            this.wbvDiagram.Location = new System.Drawing.Point(371, 47);
            this.wbvDiagram.Name = "wbvDiagram";
            this.wbvDiagram.Size = new System.Drawing.Size(1500, 1200);
            this.wbvDiagram.TabIndex = 1;
            this.wbvDiagram.ZoomFactor = 1D;
            // 
            // labShape
            // 
            this.labShape.AutoSize = true;
            this.labShape.Font = new System.Drawing.Font("宋体", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labShape.Location = new System.Drawing.Point(170, 373);
            this.labShape.Name = "labShape";
            this.labShape.Size = new System.Drawing.Size(59, 20);
            this.labShape.TabIndex = 2;
            this.labShape.Text = "shape";
            this.labShape.MouseDown += new System.Windows.Forms.MouseEventHandler(this.labShape_MouseDown);
            this.labShape.MouseMove += new System.Windows.Forms.MouseEventHandler(this.labShape_MouseMove);
            this.labShape.MouseUp += new System.Windows.Forms.MouseEventHandler(this.labShape_MouseUp);
            // 
            // DiagramForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1984, 1421);
            this.Controls.Add(this.labShape);
            this.Controls.Add(this.wbvDiagram);
            this.Controls.Add(this.addEl);
            this.Name = "DiagramForm";
            this.Text = "diagram";
            ((System.ComponentModel.ISupportInitialize)(this.wbvDiagram)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button addEl;
        private Microsoft.Web.WebView2.WinForms.WebView2 wbvDiagram;
        private System.Windows.Forms.Label labShape;
    }
}

