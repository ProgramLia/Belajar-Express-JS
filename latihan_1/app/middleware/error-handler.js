// membuat error custom dengan menggunakn (err(untuk menangkap error) , req , res , next(middleware))...
function globalError(err , req , res , next) {
    const customError = {
        // mengambil status dari err...
        status: err.status || 500,

        // mengambil message dari err...
        message: err.message || 'Internal Server Error',
    }

    // mengembalikan response berupa ststus dan message...(ini dari err)
    return res.status(customError.status).json({status:'error' , message:customError.message})
}

// membuat error jika page atau route tidak tersedia...
// note: jika tidak ada error jangan tambahkan parameter err (intinya buat jadi 4 parameter)...karena jika tidak ada error maka akan otomatis 
function notFound(req,res,next) {
    return res.status(404).json({status:"error" , message:"route tidak tersedia"})
}

module.exports = {globalError , notFound};