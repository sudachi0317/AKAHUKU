import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ==============================
// Firebase設定
// ==============================

const firebaseConfig = {

    apiKey: "AIzaSyDioJi31szk0GnpDxEODWdLzrvMhVNpA0c",

    authDomain:
        "eventit-b170f.firebaseapp.com",

    projectId:
        "eventit-b170f",

    storageBucket:
        "eventit-b170f.appspot.com",

    messagingSenderId:
        "721462916478",

    appId:
        "1:721462916478:web:4065ff575db885d5aaef2f"

};



// ==============================
// Firebase初期化
// ==============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);




// ==============================
// form.html読み込み完了待ち
// ==============================

document.addEventListener(
    "formLoaded",
    () => {


        console.log(
            "フォーム読み込み完了"
        );


        const form =
            document.getElementById(
                "contactForm"
            );



        if(!form){

            console.error(
                "contactFormが存在しません"
            );

            return;

        }




        let submitting = false;



        form.addEventListener(
            "submit",
            async (e)=>{


                e.preventDefault();



                if(submitting){

                    return;

                }


                submitting = true;




                const formError =
                    document.getElementById(
                        "formError"
                    );



                if(formError){

                    formError.textContent = "";

                    formError.classList.add(
                        "hidden"
                    );

                }




                // ==============================
                // 入力取得
                // ==============================


                const creatorName =
                    document
                    .getElementById("creatorName")
                    .value
                    .trim();



                const Xusername =
                    document
                    .getElementById("Xusername")
                    .value
                    .trim();



                const age =
                    document
                    .getElementById("age")
                    .value;



                const prefecture =
                    document
                    .getElementById("prefecture")
                    .value;



                const authCode =
                    document
                    .getElementById("authCode")
                    .value
                    .trim();



                const message =
                    document
                    .getElementById("message")
                    .value
                    .trim();



                const privacyAgree =
                    document
                    .getElementById("privacyAgree")
                    .checked;





                // ==============================
                // エラー初期化
                // ==============================


                document
                .querySelectorAll(".error-message")
                .forEach(
                    error=>{
                        error.textContent="";
                    }
                );



                let hasError = false;




                if(!creatorName){

                    document
                    .getElementById(
                        "creatorNameError"
                    )
                    .textContent =
                    "クリエイター名を入力してください";


                    hasError=true;

                }




                if(!Xusername){

                    document
                    .getElementById(
                        "XusernameError"
                    )
                    .textContent =
                    "Xのユーザ名を入力してください";


                    hasError=true;

                }




                if(!age){

                    document
                    .getElementById(
                        "ageError"
                    )
                    .textContent =
                    "年齢を選択してください";


                    hasError=true;

                }




                if(!prefecture){

                    document
                    .getElementById(
                        "prefectureError"
                    )
                    .textContent =
                    "都道府県を選択してください";


                    hasError=true;

                }




                if(!authCode){

                    document
                    .getElementById(
                        "authCodeError"
                    )
                    .textContent =
                    "認証コードを入力してください";


                    hasError=true;

                }




                if(!privacyAgree){

                    document
                    .getElementById(
                        "privacyError"
                    )
                    .textContent =
                    "プライバシーポリシーへの同意が必要です";


                    hasError=true;

                }



                if(hasError){

                    submitting=false;

                    return;

                }





                try {


                    // ==============================
                    // ① 認証コード確認
                    // ==============================


                    const authQuery =
                        query(

                            collection(
                                db,
                                "creator_auth"
                            ),


                            where(
                                "creatorName",
                                "==",
                                creatorName
                            ),


                            where(
                                "authCode",
                                "==",
                                authCode
                            )

                        );



                    const authSnapshot =
                        await getDocs(
                            authQuery
                        );




                    // console.log(
                    //     "認証件数:",
                    //     authSnapshot.size
                    // );




                    if(authSnapshot.empty){


                        throw new Error(
                            "認証情報不一致"
                        );

                    }





                    const authDoc =
                        authSnapshot.docs[0];



                    const authData =
                        authDoc.data();



                    // console.log(
                    //     "認証データ:",
                    //     authData
                    // );





                    // ==============================
                    // ② 有効期限確認
                    // ==============================


                    if(
                        !authData.expiresAt ||
                        typeof authData.expiresAt.toDate !== "function"
                    ){

                        throw new Error(
                            "expiresAtがTimestampではありません"
                        );

                    }



                    const expiresAt =
                        authData.expiresAt.toDate();



                    if(
                        new Date() > expiresAt
                    ){


                        throw new Error(
                            "認証コード期限切れ"
                        );


                    }





                    // ==============================
                    // ③ 使用済確認
                    // ==============================


                    if(
                        authData.used === true
                    ){


                        throw new Error(
                            "認証コード使用済み"
                        );


                    }





                    // ==============================
                    // ④ 参加者登録
                    // ==============================


                    await addDoc(

                        collection(
                            db,
                            "participants"
                        ),

                        {


                            creatorName,

                            Xusername,

                            age,

                            prefecture,

                            authCode,

                            message,


                            privacyAgree:true,


                            createdAt:
                                serverTimestamp()

                        }

                    );






                    // ==============================
                    // ⑤ 使用済更新
                    // ==============================


                    await updateDoc(

                        doc(

                            db,

                            "creator_auth",

                            authDoc.id

                        ),


                        {

                            used:true

                        }

                    );





                    window.location.href =
                        "complete.html";




                }
                catch(error){



                    console.error(
                        "登録エラー:",
                        error
                    );



                    if(formError){


                        formError.textContent =
                            error.message;


                        formError.classList.remove(
                            "hidden"
                        );


                    }



                    submitting=false;


                }



            }

        );


    }

);