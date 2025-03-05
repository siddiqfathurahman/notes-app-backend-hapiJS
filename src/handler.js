const { nanoid } = require('nanoid');
const notes = require('./notes');  // ✅ Import dari notes.js

// ✅ Handler untuk menambah catatan
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = { title, tags, body, id, createdAt, updatedAt };
    notes.push(newNote);

    const isSuccess = notes.some((note) => note.id === id);

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: { noteId: id },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// ✅ Handler untuk mendapatkan semua catatan
const getAllNotesHandler = () => ({
    status: 'success',
    data: { notes },
});

// ✅ Handler untuk mengedit catatan berdasarkan ID
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
   
    const index = notes.findIndex((note) => note.id === id);
   
    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
      };
   
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };


// ✅ Handler untuk mendapatkan catatan berdasarkan ID
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.find((n) => n.id === id);

    if (note) {
        return {
            status: 'success',
            data: { note },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// ✅ Ekspor handler
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler,editNoteByIdHandler };
