package com.chien.bookWorld.service;

import com.chien.bookWorld.dto.BookCreationDto;
import com.chien.bookWorld.dto.BookDto;
import com.chien.bookWorld.dto.PostCreationDto;
import com.chien.bookWorld.entity.Book;
import com.chien.bookWorld.entity.Post;
import com.chien.bookWorld.payload.response.SuccessResponse;
import java.util.Map;

public interface PostService extends
    GeneralService<Map<String, Object>, PostCreationDto, Book> {

}
