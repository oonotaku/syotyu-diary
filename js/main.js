$(document).ready(function() {
    // 今日の日付を取得して「来店日」フィールドの初期値に設定
    const today = new Date().toISOString().split('T')[0];
    $('#drunk-day').val(today);

    let currentImageData = ""; // 選択した画像データを保持する変数

    // カメラ/ファイル選択ボタンがクリックされたとき
    $('#cameraButton').on('click', function() {
        $('#camerainput').click(); // スマホでカメラを起動し、ファイル選択ダイアログを表示
    });

    // ファイル選択inputでファイルが選択されたとき
    $('#camerainput').on('change', function(event) {
        const file = event.target.files[0]; // 選択したファイルを取得

        if (file) {
            const reader = new FileReader(); // FileReaderオブジェクトを作成
            reader.onload = function(e) {
                // 画像の読み込みが完了したら、画像を表示する
                $('#image').html(`<img src="${e.target.result}" alt="Selected Image" style="max-width: 100%; height: auto;">`);
                currentImageData = e.target.result; // 画像データを変数に格納
            };
            reader.readAsDataURL(file); // 画像ファイルをDataURLとして読み込む
        }
    });

    // 1. Save クリックイベント
    $("#save").on("click", function() {
        const date = $("#drunk-day").val(); // 日付を取得
        const title = $("#theme").val(); // 表題を取得
        const topic = $("#topic").val(); // 本文を取得

        if (!date || !title || !topic) {
            alert("日付と表題と本文を入力してください。");
            return;
        }

        if (!currentImageData) {
            alert("画像を選択してください。");
            return;
        }

        // keyを「日付 + 表題 + 本文」に設定
        const key = `${date}_${title}_${topic}`;
        // valueを画像データに設定
        const value = currentImageData;

        // ローカルストレージに保存する
        localStorage.setItem(key, value);

        // 画面に表示するためにHTMLを作成
        const html = `
            <li>
                <p>${date} - ${title} - ${topic}</p>
                <img src="${value}" alt="画像プレビュー" style="max-height: 50vh;">
            </li>
        `;
        $("#list").append(html); // 表示リストに追加
    });

    // 2. Clear クリックイベント
    $("#clear").on("click", function() {
        $("#drunk-day").val(""); // 日付をクリア
        $("#theme").val(""); // 表題をクリア
        $("#topic").val(""); // 本文をクリア
        $("#image").empty(); // プレビュー画像をクリア
        localStorage.clear(); // localStorageの内容を全て削除
        $("#list").empty(); // 表示リストをクリア
    });

    // 3. ページ読み込み時に保存データを取得して表示
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // localStorageのキーを取得
        const value = localStorage.getItem(key); // 画像データを取得

        // キーから日付と表題と本文を分離
        const [date, title, topic] = key.split("_");

        // 表示用HTMLを組み立て
        const html = `
            <li>
                <p>${date} - ${title} - ${topic}</p>
                <img src="${value}" alt="画像プレビュー" style="max-height: 50vh;">
            </li>
        `;
        $("#list").append(html); // リストに追加して表示
    }
});


  const textarea = document.getElementById('topic');
  const charCount = document.getElementById('charCount');
  const maxLength = 50;

  textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    charCount.textContent = `${currentLength} / ${maxLength}`;

    if (currentLength > maxLength) {
      alert('50文字以内で入力してください。');
      textarea.value = textarea.value.substring(0, maxLength);
      charCount.textContent = `${maxLength} / ${maxLength}`;
    }
  });
