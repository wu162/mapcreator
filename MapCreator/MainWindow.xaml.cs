using System;
using System.IO;
using CefSharp;
using CefSharp.Wpf;
using MapCreator.Core.Browser;

namespace MapCreator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        public MainWindow()
        {
            var cefSettings = new CefSettings();
            cefSettings.CefCommandLineArgs.Add("disable-web-security", "true");
            Cef.Initialize(cefSettings);
            InitializeComponent();
            Browser.Address = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "h5", "index.html");
            Browser.KeyboardHandler = new MyKeyboardHandler();
        }
    }
}