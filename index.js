const venom = require('venom-bot');

venom.create().then((client)=>start(client)).catch((error)=>{
    console.log(error)
});
function start(client){
    console.log('Bot Ready')
    client.onMessage(async (message)=>{
        const fs =  require('fs')
        const mime = require('mime-types')
        // cek apakah pesan yang dikirm mengandung media type gambar dengan caption '#bot sticker'
        if (message.caption == '#bot sticker' && message.isMedia === true && message.isMMS === true && message.type=='image'){
            const buffer = await client.decryptFile(message);
            const fileName = `gambar.${mime.extension(message.mimetype)}`;
             fs.writeFile(fileName,buffer,(err)=>{
             if(!err){
                 console.log("file is created")
             }else{
                 console.log(err)
             }
            });
            // kirim notifikasi 
             await client
                  .sendText(message.from, 'Please wait...')
                  .then((result)=>{
                    console.log('Hasil: Pesan Terkirim')
                  })
                  .catch((error)=>{
                      console.log('Error saat mengirim: ', error);
                  })
            // kirim sticker ke pengirim
              await client
                   .sendImageAsSticker(message.from, './gambar.jpeg')
                   .then((result) => {
                     console.log('Hasil: Sticker Terkirim'); 
                   })
                   .catch((erro) => {
                     console.error('Error when sending: ', erro); 
                   });
        }
        if (message.body =="#bot" ) {
            await client
                    .sendText(message.from, 'Bot Ready')
                    .then((result)=>{
                        console.log('Hasil: Pesan Terkirim')
                    }).catch((error)=>{
                        console.log(error)
                    })
        }
    })
}