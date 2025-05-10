import Novel from '../models/novel.models.js';
import Chapter from '../models/chapter.models.js';
import mongoose from 'mongoose';

// done and tested
export const createChapter = async (req, res) => {
  const { novelID, chapterNumber, title, content } = req.body;

  if (!novelID || (!chapterNumber && chapterNumber != 0) || isNaN(chapterNumber) || !content) {
    return res.status(400).json({ message: 'novelID, chapterNumber, and content are required' });
  }

  try {

    const existingChapter = await Chapter.findOne({ novel: novelID, chapterNumber });

    if (existingChapter) {
      return res.status(400).json({ message: 'Chapter number already exists' });
    }

    // Create chapter
    const chapter = await Chapter.create({ novel: novelID, chapterNumber, title: title ? title : "", content });

    // Push chapter to novel
    await Novel.findByIdAndUpdate(novelID, { $push: { chapters: chapter._id } });

    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//done  and tested
export const updateChapter = async (req, res) => {
  const chapterID = req.params.id;
  const { title, novelID, chapterNumber, content } = req.body;

  // console.log(chapterID, title, chapterNumber, content)

  if (!novelID || typeof novelID !== 'string' || !novelID.trim() || !mongoose.Types.ObjectId.isValid(novelID)) {
    return res.status(400).json({ message: 'novelID is required!' });
  }

  if (!chapterID || typeof chapterID !== 'string' || !chapterID.trim() || !mongoose.Types.ObjectId.isValid(chapterID)) {
    return res.status(400).json({ message: 'Invalid chapter ID' });
  }



  if (!content && !title && !chapterNumber) {
    return res.status(400).json({ message: 'Content, title or chapterNumber is required' });
  }

  // Check if the chapterNumber already exists for the same novel
  const chapterWithChapterNumber = await Chapter.findOne({ chapterNumber, novel: novelID });

  if (chapterWithChapterNumber && chapterWithChapterNumber._id.toString() !== chapterID) {
    return res.status(400).json({ message: 'Chapter number already exists' });
  }

  try {
    const existingChapter = await Chapter.findById(chapterID);
    if (!existingChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    if (existingChapter.novel.toString() !== novelID) {
      return res.status(400).json({ message: 'Chapter does not belong to this novel' });
    }

    // Update the fields manually
    if (title !== undefined) existingChapter.title = title;
    if (content !== undefined) existingChapter.content = content;
    if (chapterNumber !== undefined) existingChapter.chapterNumber = chapterNumber;

    // Save the document to trigger pre('save')
    const updatedChapter = await existingChapter.save();

    // Update the novel's updatedAt field
    // Update the novel's updatedAt field by saving the novel document to trigger pre('save')
    const novel = await Novel.findById(novelID);
    if (novel) {
      novel.updatedAt = new Date();
      await novel.save();
    }

    return res.status(200).json(updatedChapter);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getLatestChapters = async (req, res) => {
  const count = Number(req.query.count) || 10;

  try {
    const chapters = await Chapter.find()
      .populate('novel', 'title author thumbnail')
      .select('_id title chapterNumber updatedAt novel')
      .sort({ createdAt: -1 })
      .limit(count);

    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//done
export const getAllChapters = async (req, res) => {
  const novelID = req.params.novelId;

  if (!novelID || typeof novelID !== 'string' || !novelID.trim() || !mongoose.Types.ObjectId.isValid(novelID)) {
    return res.status(400).json({ message: 'Novel ID is required' });
  }

  try {
    const chapters = await Chapter.find({ novel: novelID }).sort('chapterNumber');
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//done and tested
export const getChapterByID = async (req, res) => {

  const chapterID = req.params.id;

  if (!chapterID || typeof chapterID !== 'string' || !chapterID.trim() || !mongoose.Types.ObjectId.isValid(chapterID)) {
    return res.status(400).json({ message: 'Invalid chapter ID' });
  }

  try {
    const chapter = await Chapter.findById(chapterID);

    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const deleteChapter = async (req, res) => {
  const chapterID = req.params.id;

  if (!chapterID || typeof chapterID !== 'string' || !chapterID.trim() || !mongoose.Types.ObjectId.isValid(chapterID)) {
    return res.status(400).json({ message: 'Invalid chapter ID' });
  }

  try {
    const chapter = await Chapter.findById(chapterID);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Remove chapter reference from the novel
    await Novel.findByIdAndUpdate(chapter.novel, { $pull: { chapters: chapterID } });

    // Delete the chapter
    const deletedChapter = await Chapter.findByIdAndDelete(chapterID);

    res.status(200).json({ message: 'Chapter deleted successfully', deletedChapter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};