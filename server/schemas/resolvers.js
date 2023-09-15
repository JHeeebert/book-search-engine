const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// Add SweetAlert2
const Swal = require('sweetalert2');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
    Query: {
        me: async (_, _, context) => {
            if (context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const userData = await User.findById(context.user._id).select('-__v -password');
            return userData;
        },
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email not found!',
                });
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect password!',
                });
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { book }, context) => {
            if (context.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You need to be logged in!',
                });
                throw new AuthenticationError('You need to be logged in!');
            }
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        removeBook: async (_, { bookId }, context) => {
            if (context.user) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You need to be logged in!',
                });
                throw new AuthenticationError('You need to be logged in!');
            }
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { _id: bookId } } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
    }
};

module.exports = resolvers;
