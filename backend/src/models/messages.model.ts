import { Schema, model } from 'mongoose';

const messagesSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

messagesSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['__v'];
    return ret;
  },
});

const MessagesModel = model('Message', messagesSchema);

export default MessagesModel;
