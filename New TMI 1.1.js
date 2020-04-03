/*
New TMI
version 1.1
© 2020 Dark Tornado, All rights reserved.
리뷰는 허용하나, 무단공유, 무단수정, 제작자속이기 등을 할 시에는 싸대기 때리러 감.
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var btn = null;
var btn2 = null;
var menu = null;

const Info = {
    VERSION: "1.1"
};
const Ui = {};
const Log = {};
const Utils = {};

Ui.toast = function(msg) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var toast = new android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_LONG);
                toast.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.showDialog = function(title, msg) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle(title);
                dialog.setMessage(msg);
                dialog.setNegativeButton("닫기", null);
                dialog.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.makeButton = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                if (btn != null) btn.dismiss();
                btn = new android.widget.PopupWindow();
                var button = new android.widget.Button(ctx);
                button.setText("M");
                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        if (menu == null) {
                            Ui.openMenu();
                            Ui.creteSubButton();
                        } else {
                            Ui.closeAll(false);
                        }
                    }
                }));
                var longTouchCheck = false;
                button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function(v) {
                        longTouchCheck = true;
                        return true;
                    }
                }));
                button.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function(v, ev) {
                        try {
                            if (longTouchCheck) {
                                switch (ev.action) {
                                    case android.view.MotionEvent.ACTION_MOVE:
                                        btn.update(ctx.getWindowManager().getDefaultDisplay().getWidth() - ev.getRawX(), ctx.getWindowManager().getDefaultDisplay().getHeight() - ev.getRawY(), btn.getWidth(), btn.getHeight());
                                        break;
                                    case android.view.MotionEvent.ACTION_UP:
                                        longTouchCheck = false;
                                        break;
                                }
                            }
                        } catch (e) {
                            //Log.error(e);
                        }
                        return false;
                    }
                }));
                btn.setContentView(button);
                btn.setWidth(dip2px(ctx, 45));
                btn.setHeight(dip2px(ctx, 45));
                btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.openMenu = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                menu = new android.widget.PopupWindow();
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var title = new android.widget.TextView(ctx);
                title.setText("New TMI");
                title.setTextSize(23);
                title.setTextColor(android.graphics.Color.WHITE);
                title.setBackgroundColor(android.graphics.Color.BLACK);
                title.setPadding(dip2px(ctx, 20), dip2px(ctx, 10), dip2px(ctx, 10), dip2px(ctx, 15));
                try {
                    title.setElevation(dip2px(ctx, 3));
                } catch (e) {}

                var btns = [];
                var menus = ["아이템 지급", "들고 있는 아이템 삭제", "인벤토리 리셋", "게임모드 변경", "체력 설정", "스크립트 정보", "닫기"];
                for (var n in menus) {
                    btns[n] = new android.widget.Button(ctx);
                    btns[n].setText(menus[n]);
                    btns[n].setId(n);
                    btns[n].setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            switch (v.getId()) {
                                case 0:
                                    Ui.giveItem();
                                    break;
                                case 1:
                                    Player.clearInventorySlot(Player.getSelectedSlotId());
                                    Ui.toast("삭제되었습니다.");
                                    break;
                                case 2:
                                    for (var n = 0; n < 55; n++)
                                        Player.clearInventorySlot(n);
                                    Ui.toast("인벤토리가 리셋되었습니다.");
                                    break;
                                case 3:
                                    Ui.gamemodeList();
                                    break;
                                case 4:
                                    Ui.inputHealth();
                                    break;
                                case 5:
                                    Ui.showDialog("스크립트 정보", "스크립트 이름 : New TMI\n버전 : " + Info.VERSION + "\n제작자 : Dark Tornado");
                                    break;
                                case 6:
                                    Ui.closeAll(false);
                                    break;
                            }
                        }
                    }));
                    layout.addView(btns[n]);
                }

                var maker = new android.widget.TextView(ctx);
                maker.setText("\n© 2020 Dark Tornado\n");
                maker.setTextSize(11);
                maker.setTextColor(android.graphics.Color.WHITE);
                maker.setGravity(android.view.Gravity.CENTER);
                layout.addView(maker);

                var pad = dip2px(ctx, 10);
                layout.setPadding(pad, dip2px(ctx, 18), pad, pad);
                var scroll = new android.widget.ScrollView(ctx);
                scroll.addView(layout);
                var layout2 = new android.widget.LinearLayout(ctx);
                layout2.setOrientation(1);
                layout2.addView(title);
                layout2.addView(scroll);
                menu.setContentView(layout2);
                menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() / 3);
                menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
                menu.setAnimationStyle(android.R.style.Animation_Translucent);
                menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.parseColor("#424242")));
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, 0, 0);
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.creteSubButton = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                if (btn2 != null) btn2.dismiss();
                btn2 = new android.widget.PopupWindow();
                var button = new android.widget.Button(ctx);
                button.setText("시간");
                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        if (Level.isNight()) {
                            Level.setTime(1400);
                            Ui.toast("낮으로 설정되었습니다.")
                        } else {
                            Level.setTime(14000);
                            Ui.toast("밤으로 설정되었습니다.")
                        }
                    }
                }));
                button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function(v) {
                        Ui.selectTime();
                        return true;
                    }
                }));
                btn2.setContentView(button);
                btn2.setWidth(dip2px(ctx, 65));
                btn2.setHeight(dip2px(ctx, 48));
                btn2.setAnimationStyle(android.R.style.Animation_InputMethod);
                btn2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                btn2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.closeAll = function(tf) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                if (tf) {
                    if (btn != null) {
                        btn.dismiss();
                        btn = null;
                    }
                }
                if (menu != null) {
                    menu.dismiss();
                    menu = null;
                }
                if (btn2 != null) {
                    btn2.dismiss();
                    btn2 = null;
                }
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.giveItem = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var menu = new TmiWindow(ctx);
                menu.setTitle("아이템 지급");
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var txt1 = new android.widget.TextView(ctx);
                var txt2 = new android.widget.EditText(ctx);
                var txt3 = new android.widget.TextView(ctx);
                var txt4 = new android.widget.EditText(ctx);
                var txt5 = new android.widget.TextView(ctx);
                var txt6 = new android.widget.EditText(ctx);
                txt1.setText("아이템 아이디 : ");
                txt1.setTextSize(17);
                txt2.setHint("아이템 아이디 입력...");
                txt2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                txt3.setText("\n아이템 개수 : ");
                txt3.setTextSize(17);
                txt4.setHint("아이템 개수 입력...");
                txt4.setInputType(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
                txt5.setText("\n아이템 데미지 : ");
                txt5.setTextSize(17);
                txt6.setHint("아이템 데미지 입력...");
                txt6.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                layout.addView(txt1);
                layout.addView(txt2);
                layout.addView(txt3);
                layout.addView(txt4);
                layout.addView(txt5);
                layout.addView(txt6);

                var blank = new android.widget.TextView(ctx);
                blank.setText(" ");
                blank.setTextSize(10);
                layout.addView(blank);

                var give = new android.widget.Button(ctx);
                give.setText("확인");
                give.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        addItemInventory(txt2.getText(), txt4.getText(), txt6.getText());
                        Ui.toast("지급되었습니다.");
                        menu.close();
                    }
                }));
                layout.addView(give);
                var close = new android.widget.Button(ctx);
                close.setText("취소");
                close.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        menu.close();
                    }
                }));
                layout.addView(close);

                var pad = dip2px(ctx, 10);
                layout.setPadding(pad, pad, pad, pad);
                var scroll = new android.widget.ScrollView(ctx);
                scroll.addView(layout);
                menu.setView(scroll);
                menu.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.gamemodeList = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("게임 모드 설정");
                var modes = ["서바이벌", "크리에이티브"];
                dialog.setItems(modes, new android.content.DialogInterface.OnClickListener({
                    onClick: function(m, w) {
                        Level.setGameMode(w);
                        Utils.exeCmd("/gamemode " + w);
                        Ui.toast("게임 모드가 " + modes[w] + "(으)로 설정되었습니다.");
                    }
                }));
                dialog.setNegativeButton("취소", null);
                dialog.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.selectTime = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("시간 설정");
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var time = Level.getTime() % 24000;
                var txt = new android.widget.TextView(ctx);
                txt.setText("시간 : " + time);
                txt.setTextSize(18);
                layout.addView(txt);
                var bar = new android.widget.SeekBar(ctx);
                bar.setMax(24000);
                bar.setProgress(time);
                bar.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
                    onProgressChanged: function(seek) {
                        time = seek.getProgress();
                        txt.setText("시간 : " + time);
                    }
                }));
                layout.addView(bar);
                var names = ["새벽", "낮", "저녁", "밤"];
                var times = [0, 1400, 9600, 14000];
                var list = new android.widget.ListView(ctx);
                var adapter = new android.widget.ArrayAdapter(ctx, android.R.layout.simple_list_item_1, names);
                list.setAdapter(adapter);
                list.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener() {
                    onItemClick: function(parent, view, pos, id) {
                        bar.setProgress(times[pos]);
                    }
                });
                layout.addView(list);
                var pad = dip2px(ctx, 20);
                layout.setPadding(pad, pad, pad, pad);
                dialog.setView(layout);
                dialog.setNegativeButton("취소", null);
                dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
                    onClick: function(v) {
                        Level.setTime(time);
                        Ui.toast("시간이 " + time + "(으)로 설정되었습니다.");
                    }
                }));
                dialog.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.inputHealth = function() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var menu = new TmiWindow(ctx);
                menu.setTitle("체력 설정");
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var txt1 = new android.widget.TextView(ctx);
                var txt2 = new android.widget.EditText(ctx);
                txt1.setText("체력 : ");
                txt1.setTextSize(17);
                txt2.setHint("체력 입력...");
                txt2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
                layout.addView(txt1);
                layout.addView(txt2);

                var blank = new android.widget.TextView(ctx);
                blank.setText(" ");
                blank.setTextSize(10);
                layout.addView(blank);

                var set = new android.widget.Button(ctx);
                set.setText("확인");
                set.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        Player.setHealth(txt2.getText());
                        Ui.toast("설정되었습니다.");
                        menu.close();
                    }
                }));
                layout.addView(set);
                var close = new android.widget.Button(ctx);
                close.setText("취소");
                close.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        menu.close();
                    }
                }));
                layout.addView(close);

                var pad = dip2px(ctx, 10);
                layout.setPadding(pad, pad, pad, pad);
                var scroll = new android.widget.ScrollView(ctx);
                scroll.addView(layout);
                menu.setView(scroll);
                menu.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};
Ui.updateDialog = function(version) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new android.app.AlertDialog.Builder(ctx);
                dialog.setTitle("최신 버전 발견");
                dialog.setMessage("최신 버전이 발견되었습니다.\n\n현재 버전 : " + Info.VERSION + "\n최신 버전 : " + version);
                dialog.setNegativeButton("닫기", null);
                dialog.setPositiveButton("제작자 블로그", new android.content.DialogInterface.OnClickListener({
                    onClick: function(v) {
                        var uri = new android.net.Uri.parse("http://blog.naver.com/dt3141592");
                        var link = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
                        ctx.startActivity(link);
                        Ui.toast("제작자 블로그로 이동합니다...");
                    }
                }));
                dialog.show();
            } catch (e) {
                Log.error(e);
            }
        }
    }));
};

function TmiWindow(ctx) {
    this.menu = new android.widget.PopupWindow();
    this.title = null;
    this.view = null;
};

TmiWindow.prototype = {};
TmiWindow.prototype.setTitle = function(txt) {
    this.title = txt;
};
TmiWindow.prototype.setView = function(view) {
    this.view = view;
};
TmiWindow.prototype.show = function() {
    try {
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(1);
        if (this.title != null) {
            var title = new android.widget.TextView(ctx);
            title.setText(this.title);
            title.setTextSize(23);
            title.setTextColor(android.graphics.Color.WHITE);
            title.setBackgroundColor(android.graphics.Color.BLACK);
            title.setPadding(dip2px(ctx, 20), dip2px(ctx, 10), dip2px(ctx, 10), dip2px(ctx, 15));
            try {
                title.setElevation(dip2px(ctx, 3));
            } catch (e) {}
            layout.addView(title);
        }
        if (this.view != null) layout.addView(this.view);
        this.menu.setContentView(layout);
        this.menu.setFocusable(true);
        this.menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() / 3);
        this.menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
        this.menu.setAnimationStyle(android.R.style.Animation_Translucent);
        this.menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.parseColor("#424242")));
        this.menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, 0, 0);
    } catch (e) {
        Log.error(e);
    }
};
TmiWindow.prototype.close = function() {
    if (this.menu != null) {
        this.menu.dismiss();
        this.menu = null;
    }
};

Log.error = function(e) {
    Ui.showDialog("Error in New TMI", e + "\nAt : " + e.lineNumber);
};
Utils.exeCmd = function(cmd) {
    try {
        Level.executeCommand(cmd, true);
    } catch (e) {
        //Log.error(e);
    }
};
Utils.getNewestVersion = function() {
    try {
        var data = Utils.getWebText("https://raw.githubusercontent.com/DarkTornado/NewTMI/master/NewestVersion.txt");
        if (data == null) return "알 수 없음";
        var vers = data.split("nt");
        return vers[1];
    } catch (e) {
        Log.error(e);
        return "알 수 없음";
    }
};
Utils.getWebText = function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        return str.toString();
    } catch (e) {
        return null;
        Log.error(e);
    }
};
Utils.getNotice = function() {
    try {
        var data = Utils.getWebText("https://raw.githubusercontent.com/DarkTornado/NewTMI/master/Notice.txt");
        if (data == null) return null;
        if (data.trim() == "null") return null;
        var noti = data.split(":::");
        if (noti[1] == "null") return null;
        return [noti[1], noti[2]];
    } catch (e) {
        Log.error(e);
        return null;
    }
};

Level.isNight = function() {
    var time = Level.getTime();
    var data = time % 24000;
    return data >= 12000;
};


function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel() {
    Ui.makeButton();

    var vers = Utils.getNewestVersion();
    if (Number(vers) > Number(Info.VERSION)) {
        Ui.updateDialog(vers);
    }

    var noti = Utils.getNotice();
    if (noti != null) {
        Ui.showDialog(noti[0], noti[1]);
    }

}

function leaveGame() {
    Ui.closeAll(true);
}

