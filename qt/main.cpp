
#include <QtCore/QtCore>
enum class PubliserType { PUB_RTSP="rtsp", PUB_RTMP="rtmp" };

int main(void)
{
    QString s("{\"status\":\"ok\",\"result\":{\"enabled\":true,\"type\":6,\"state\":\"started\",\"duration\":7549, \"warnings\":\"AAA\"}}");

    QString p("{\"status\":\"ok\",\"result\":[{\"id\":\"0\",\"type\":\"rtmp\",\"status\":{\"enabled\":true,\"type\":3,\"state\":\"started\",\"duration\":8204, \"warnings\":[{\"text\":\"AAA\"}]}},{\"id\":\"1\",\"type\":\"rtmp\",\"status\":{\"enabled\":true,\"type\":6,\"state\":\"started\",\"duration\":8204}}]}");

    QJsonDocument doc = QJsonDocument::fromJson(p.toUtf8());
    QJsonObject obj = doc.object();
    
//    QJsonObject jsonResult = obj[ "result" ].toObject();
//    qInfo() << "jsonResult " << obj[ "result" ];
    QJsonArray ar = obj[ "result" ].toArray();

    QJsonValue val;
    foreach(QJsonValue val, ar)
    {
         qInfo() << "Start";
         QJsonObject o = val.toObject()["status"].toObject();
         int t = o.value("type").toInt();
         switch (t) {
         case 1:     // epiphan.tv
         case 2:     // Generic RTSP
         case 6:     // Generic RTMP
         case 7:     // Wowza Cloud
         case 8:    // Livestream Original
             qInfo() << "Break";
             break;
         default:
             qInfo() << "Deault";
             continue;     // Ignore all unsupported publishers
         }


         qInfo() << o.value("type").toInt();
         qInfo() << (p == o.value("type").toInt());
        
    if( o.constFind("warnings") == o.constEnd() ) {
        qInfo() << "NOT FOUND";
    } else {
        qInfo() << "FOUND";
    }

       
    }


    // if( jsonResult.constFind("warnings") == jsonResult.constEnd() ) {
    //     qInfo() << "NOT FOUND";
    // } else {
    //     qInfo() << "FOUND";
    // }

//    qInfo() << jsonResult;
//    bool isWarningsPresent = jsonResult.contains( "warnings" );
//    qInfo() << isWarningsPresent;
    QString message("msg");
    message += QString::fromStdString("") + "\n";
    qInfo() << message;

    return 0;
}
