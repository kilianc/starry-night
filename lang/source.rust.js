// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/dustypomerleau/rust-syntax>
// and licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.rs', '.rs.in'],
  names: ['rust', 'rs'],
  patterns: [
    {
      begin: '(<)(\\[)',
      beginCaptures: {
        1: {name: 'punctuation.brackets.angle.rust'},
        2: {name: 'punctuation.brackets.square.rust'}
      },
      end: '>',
      endCaptures: {0: {name: 'punctuation.brackets.angle.rust'}},
      patterns: [
        {include: '#block-comments'},
        {include: '#comments'},
        {include: '#gtypes'},
        {include: '#lvariables'},
        {include: '#lifetimes'},
        {include: '#punctuation'},
        {include: '#types'}
      ]
    },
    {
      captures: {
        1: {name: 'keyword.operator.macro.dollar.rust'},
        3: {name: 'keyword.other.crate.rust'},
        4: {name: 'entity.name.type.metavariable.rust'},
        6: {name: 'keyword.operator.key-value.rust'},
        7: {name: 'variable.other.metavariable.specifier.rust'}
      },
      match:
        '(\\$)((crate)|([A-Z][A-Za-z0-9_]*))((:)(block|expr|ident|item|lifetime|literal|meta|path?|stmt|tt|ty|vis))?',
      name: 'meta.macro.metavariable.type.rust',
      patterns: [{include: '#keywords'}]
    },
    {
      captures: {
        1: {name: 'keyword.operator.macro.dollar.rust'},
        2: {name: 'variable.other.metavariable.name.rust'},
        4: {name: 'keyword.operator.key-value.rust'},
        5: {name: 'variable.other.metavariable.specifier.rust'}
      },
      match:
        '(\\$)([a-z][A-Za-z0-9_]*)((:)(block|expr|ident|item|lifetime|literal|meta|path?|stmt|tt|ty|vis))?',
      name: 'meta.macro.metavariable.rust',
      patterns: [{include: '#keywords'}]
    },
    {
      captures: {
        1: {name: 'entity.name.function.macro.rules.rust'},
        3: {name: 'entity.name.function.macro.rust'},
        4: {name: 'entity.name.type.macro.rust'},
        5: {name: 'punctuation.brackets.curly.rust'}
      },
      match: '\\b(macro_rules!)\\s+(([a-z0-9_]+)|([A-Z][a-z0-9_]*))\\s+(\\{)',
      name: 'meta.macro.rules.rust'
    },
    {
      captures: {
        1: {name: 'storage.type.rust'},
        2: {name: 'entity.name.module.rust'}
      },
      match: '(mod)\\s+((?:r#(?!crate|[Ss]elf|super))?[a-z][A-Za-z0-9_]*)'
    },
    {
      begin: '\\b(extern)\\s+(crate)',
      beginCaptures: {
        1: {name: 'storage.type.rust'},
        2: {name: 'keyword.other.crate.rust'}
      },
      end: ';',
      endCaptures: {0: {name: 'punctuation.semi.rust'}},
      name: 'meta.import.rust',
      patterns: [
        {include: '#block-comments'},
        {include: '#comments'},
        {include: '#keywords'},
        {include: '#punctuation'}
      ]
    },
    {
      begin: '\\b(use)\\s',
      beginCaptures: {1: {name: 'keyword.other.rust'}},
      end: ';',
      endCaptures: {0: {name: 'punctuation.semi.rust'}},
      name: 'meta.use.rust',
      patterns: [
        {include: '#block-comments'},
        {include: '#comments'},
        {include: '#keywords'},
        {include: '#namespaces'},
        {include: '#punctuation'},
        {include: '#types'},
        {include: '#lvariables'}
      ]
    },
    {include: '#block-comments'},
    {include: '#comments'},
    {include: '#attributes'},
    {include: '#lvariables'},
    {include: '#constants'},
    {include: '#gtypes'},
    {include: '#functions'},
    {include: '#types'},
    {include: '#keywords'},
    {include: '#lifetimes'},
    {include: '#macros'},
    {include: '#namespaces'},
    {include: '#punctuation'},
    {include: '#strings'},
    {include: '#variables'}
  ],
  repository: {
    attributes: {
      begin: '(#)(\\!?)(\\[)',
      beginCaptures: {
        1: {name: 'punctuation.definition.attribute.rust'},
        3: {name: 'punctuation.brackets.attribute.rust'}
      },
      end: '\\]',
      endCaptures: {0: {name: 'punctuation.brackets.attribute.rust'}},
      name: 'meta.attribute.rust',
      patterns: [
        {include: '#block-comments'},
        {include: '#comments'},
        {include: '#keywords'},
        {include: '#lifetimes'},
        {include: '#punctuation'},
        {include: '#strings'},
        {include: '#gtypes'},
        {include: '#types'}
      ]
    },
    'block-comments': {
      patterns: [
        {match: '/\\*\\*/', name: 'comment.block.rust'},
        {
          begin: '/\\*\\*',
          end: '\\*/',
          name: 'comment.block.documentation.rust',
          patterns: [{include: '#block-comments'}]
        },
        {
          begin: '/\\*(?!\\*)',
          end: '\\*/',
          name: 'comment.block.rust',
          patterns: [{include: '#block-comments'}]
        }
      ]
    },
    comments: {
      patterns: [
        {match: '^\\s*///.*', name: 'comment.line.documentation.rust'},
        {match: '\\s*//.*', name: 'comment.line.double-slash.rust'}
      ]
    },
    constants: {
      patterns: [
        {match: '\\b[A-Z]{2}[A-Z0-9_]*\\b', name: 'constant.other.caps.rust'},
        {
          captures: {
            1: {name: 'storage.type.rust'},
            2: {name: 'constant.other.caps.rust'}
          },
          match: '\\b(const)\\s+([A-Z][A-Za-z0-9_]*)\\b'
        },
        {
          captures: {
            1: {name: 'punctuation.separator.dot.decimal.rust'},
            2: {name: 'keyword.operator.exponent.rust'},
            3: {name: 'keyword.operator.exponent.sign.rust'},
            4: {name: 'constant.numeric.decimal.exponent.mantissa.rust'},
            5: {name: 'entity.name.type.numeric.rust'}
          },
          match:
            '\\b\\d[\\d_]*(\\.?)[\\d_]*(?:(E|e)([+-]?)([\\d_]+))?(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          name: 'constant.numeric.decimal.rust'
        },
        {
          captures: {1: {name: 'entity.name.type.numeric.rust'}},
          match:
            '\\b0x[\\da-fA-F_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          name: 'constant.numeric.hex.rust'
        },
        {
          captures: {1: {name: 'entity.name.type.numeric.rust'}},
          match:
            '\\b0o[0-7_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          name: 'constant.numeric.oct.rust'
        },
        {
          captures: {1: {name: 'entity.name.type.numeric.rust'}},
          match:
            '\\b0b[01_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\b',
          name: 'constant.numeric.bin.rust'
        },
        {match: '\\b(true|false)\\b', name: 'constant.language.bool.rust'}
      ]
    },
    escapes: {
      captures: {
        1: {name: 'constant.character.escape.backslash.rust'},
        2: {name: 'constant.character.escape.bit.rust'},
        3: {name: 'constant.character.escape.unicode.rust'},
        4: {name: 'constant.character.escape.unicode.punctuation.rust'},
        5: {name: 'constant.character.escape.unicode.punctuation.rust'}
      },
      match:
        '(\\\\)(?:(?:(x[0-7][\\da-fA-F])|(u(\\{)[\\da-fA-F]{4,6}(\\}))|.))',
      name: 'constant.character.escape.rust'
    },
    functions: {
      patterns: [
        {
          captures: {
            1: {name: 'keyword.other.rust'},
            2: {name: 'punctuation.brackets.round.rust'}
          },
          match: '\\b(pub)(\\()'
        },
        {
          begin:
            '\\b(fn)\\s+((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)((\\()|(<))',
          beginCaptures: {
            1: {name: 'keyword.other.fn.rust'},
            2: {name: 'entity.name.function.rust'},
            4: {name: 'punctuation.brackets.round.rust'},
            5: {name: 'punctuation.brackets.angle.rust'}
          },
          end: '\\{|;',
          endCaptures: {0: {name: 'punctuation.brackets.curly.rust'}},
          name: 'meta.function.definition.rust',
          patterns: [
            {include: '#block-comments'},
            {include: '#comments'},
            {include: '#keywords'},
            {include: '#lvariables'},
            {include: '#constants'},
            {include: '#gtypes'},
            {include: '#functions'},
            {include: '#lifetimes'},
            {include: '#macros'},
            {include: '#namespaces'},
            {include: '#punctuation'},
            {include: '#strings'},
            {include: '#types'},
            {include: '#variables'}
          ]
        },
        {
          begin: '((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)(\\()',
          beginCaptures: {
            1: {name: 'entity.name.function.rust'},
            2: {name: 'punctuation.brackets.round.rust'}
          },
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.brackets.round.rust'}},
          name: 'meta.function.call.rust',
          patterns: [
            {include: '#block-comments'},
            {include: '#comments'},
            {include: '#attributes'},
            {include: '#keywords'},
            {include: '#lvariables'},
            {include: '#constants'},
            {include: '#gtypes'},
            {include: '#functions'},
            {include: '#lifetimes'},
            {include: '#macros'},
            {include: '#namespaces'},
            {include: '#punctuation'},
            {include: '#strings'},
            {include: '#types'},
            {include: '#variables'}
          ]
        },
        {
          begin: '((?:r#(?!crate|[Ss]elf|super))?[A-Za-z0-9_]+)(?=::<.*>\\()',
          beginCaptures: {1: {name: 'entity.name.function.rust'}},
          end: '\\)',
          endCaptures: {0: {name: 'punctuation.brackets.round.rust'}},
          name: 'meta.function.call.rust',
          patterns: [
            {include: '#block-comments'},
            {include: '#comments'},
            {include: '#attributes'},
            {include: '#keywords'},
            {include: '#lvariables'},
            {include: '#constants'},
            {include: '#gtypes'},
            {include: '#functions'},
            {include: '#lifetimes'},
            {include: '#macros'},
            {include: '#namespaces'},
            {include: '#punctuation'},
            {include: '#strings'},
            {include: '#types'},
            {include: '#variables'}
          ]
        }
      ]
    },
    gtypes: {
      patterns: [
        {match: '\\b(Some|None)\\b', name: 'entity.name.type.option.rust'},
        {match: '\\b(Ok|Err)\\b', name: 'entity.name.type.result.rust'}
      ]
    },
    interpolations: {
      captures: {
        1: {name: 'punctuation.definition.interpolation.rust'},
        2: {name: 'punctuation.definition.interpolation.rust'}
      },
      match: '({)[^"{}]*(})',
      name: 'meta.interpolation.rust'
    },
    keywords: {
      patterns: [
        {
          match:
            '\\b(await|break|continue|do|else|for|if|loop|match|return|try|while|yield)\\b',
          name: 'keyword.control.rust'
        },
        {
          match: '\\b(extern|let|macro|mod)\\b',
          name: 'keyword.other.rust storage.type.rust'
        },
        {match: '\\b(const)\\b', name: 'storage.modifier.rust'},
        {
          match: '\\b(type)\\b',
          name: 'keyword.declaration.type.rust storage.type.rust'
        },
        {
          match: '\\b(enum)\\b',
          name: 'keyword.declaration.enum.rust storage.type.rust'
        },
        {
          match: '\\b(trait)\\b',
          name: 'keyword.declaration.trait.rust storage.type.rust'
        },
        {
          match: '\\b(struct)\\b',
          name: 'keyword.declaration.struct.rust storage.type.rust'
        },
        {match: '\\b(abstract|static)\\b', name: 'storage.modifier.rust'},
        {
          match:
            '\\b(as|async|become|box|dyn|move|final|impl|in|override|priv|pub|ref|typeof|union|unsafe|unsized|use|virtual|where)\\b',
          name: 'keyword.other.rust'
        },
        {match: '\\bfn\\b', name: 'keyword.other.fn.rust'},
        {match: '\\bcrate\\b', name: 'keyword.other.crate.rust'},
        {match: '\\bmut\\b', name: 'storage.modifier.mut.rust'},
        {
          match: '(\\^|\\||\\|\\||&&|<<|>>|!)(?!=)',
          name: 'keyword.operator.logical.rust'
        },
        {match: '&(?![&=])', name: 'keyword.operator.borrow.and.rust'},
        {
          match: '(\\+=|-=|\\*=|/=|%=|\\^=|&=|\\|=|<<=|>>=)',
          name: 'keyword.operator.assignment.rust'
        },
        {
          match: '(?<![<>])=(?!=|>)',
          name: 'keyword.operator.assignment.equal.rust'
        },
        {
          match: '(=(=)?(?!>)|!=|<=|(?<!=)>=)',
          name: 'keyword.operator.comparison.rust'
        },
        {
          match: '(([+%]|(\\*(?!\\w)))(?!=))|(-(?!>))|(/(?!/))',
          name: 'keyword.operator.math.rust'
        },
        {
          captures: {
            1: {name: 'punctuation.brackets.round.rust'},
            2: {name: 'punctuation.brackets.square.rust'},
            3: {name: 'punctuation.brackets.curly.rust'},
            4: {name: 'keyword.operator.comparison.rust'},
            5: {name: 'punctuation.brackets.round.rust'},
            6: {name: 'punctuation.brackets.square.rust'},
            7: {name: 'punctuation.brackets.curly.rust'}
          },
          match:
            '(?:\\b|(?:(\\))|(\\])|(\\})))[ \\t]+([<>])[ \\t]+(?:\\b|(?:(\\()|(\\[)|(\\{)))'
        },
        {match: '::', name: 'keyword.operator.namespace.rust'},
        {
          captures: {1: {name: 'keyword.operator.dereference.rust'}},
          match: '(\\*)(?=\\w+)'
        },
        {match: '@', name: 'keyword.operator.subpattern.rust'},
        {match: '\\.(?!\\.)', name: 'keyword.operator.access.dot.rust'},
        {match: '\\.{2}(=|\\.)?', name: 'keyword.operator.range.rust'},
        {match: ':(?!:)', name: 'keyword.operator.key-value.rust'},
        {match: '->', name: 'keyword.operator.arrow.skinny.rust'},
        {match: '=>', name: 'keyword.operator.arrow.fat.rust'},
        {match: '\\$', name: 'keyword.operator.macro.dollar.rust'},
        {match: '\\?', name: 'keyword.operator.question.rust'}
      ]
    },
    lifetimes: {
      patterns: [
        {
          captures: {
            1: {name: 'punctuation.definition.lifetime.rust'},
            2: {name: 'entity.name.type.lifetime.rust'}
          },
          match: "(['])([a-zA-Z_][0-9a-zA-Z_]*)(?!['])\\b"
        },
        {
          captures: {
            1: {name: 'keyword.operator.borrow.rust'},
            2: {name: 'punctuation.definition.lifetime.rust'},
            3: {name: 'entity.name.type.lifetime.rust'}
          },
          match: "(\\&)(['])([a-zA-Z_][0-9a-zA-Z_]*)(?!['])\\b"
        }
      ]
    },
    lvariables: {
      patterns: [
        {match: '\\b[Ss]elf\\b', name: 'variable.language.self.rust'},
        {match: '\\bsuper\\b', name: 'variable.language.super.rust'}
      ]
    },
    macros: {
      patterns: [
        {
          captures: {
            2: {name: 'entity.name.function.macro.rust'},
            3: {name: 'entity.name.type.macro.rust'}
          },
          match: '(([a-z_][A-Za-z0-9_]*!)|([A-Z_][A-Za-z0-9_]*!))',
          name: 'meta.macro.rust'
        }
      ]
    },
    namespaces: {
      patterns: [
        {
          captures: {
            1: {name: 'entity.name.namespace.rust'},
            2: {name: 'keyword.operator.namespace.rust'}
          },
          match: '(?<![A-Za-z0-9_])([A-Za-z0-9_]+)((?<!super|self)::)'
        }
      ]
    },
    punctuation: {
      patterns: [
        {match: ',', name: 'punctuation.comma.rust'},
        {match: '[{}]', name: 'punctuation.brackets.curly.rust'},
        {match: '[()]', name: 'punctuation.brackets.round.rust'},
        {match: ';', name: 'punctuation.semi.rust'},
        {match: '[\\[\\]]', name: 'punctuation.brackets.square.rust'},
        {match: '(?<!=)[<>]', name: 'punctuation.brackets.angle.rust'}
      ]
    },
    strings: {
      patterns: [
        {
          begin: '(b?)(")',
          beginCaptures: {
            1: {name: 'string.quoted.byte.raw.rust'},
            2: {name: 'punctuation.definition.string.rust'}
          },
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.rust'}},
          name: 'string.quoted.double.rust',
          patterns: [{include: '#escapes'}, {include: '#interpolations'}]
        },
        {
          begin: '(b?r)(#*)(")',
          beginCaptures: {
            1: {name: 'string.quoted.byte.raw.rust'},
            2: {name: 'punctuation.definition.string.raw.rust'},
            3: {name: 'punctuation.definition.string.rust'}
          },
          end: '(")(\\2)',
          endCaptures: {
            1: {name: 'punctuation.definition.string.rust'},
            2: {name: 'punctuation.definition.string.raw.rust'}
          },
          name: 'string.quoted.double.rust'
        },
        {
          begin: "(b)?(')",
          beginCaptures: {
            1: {name: 'string.quoted.byte.raw.rust'},
            2: {name: 'punctuation.definition.char.rust'}
          },
          end: "'",
          endCaptures: {0: {name: 'punctuation.definition.char.rust'}},
          name: 'string.quoted.single.char.rust',
          patterns: [{include: '#escapes'}]
        }
      ]
    },
    types: {
      patterns: [
        {
          captures: {1: {name: 'entity.name.type.numeric.rust'}},
          match:
            '(?<![A-Za-z])(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)\\b'
        },
        {
          begin: '\\b(_?[A-Z][A-Za-z0-9_]*)(<)',
          beginCaptures: {
            1: {name: 'entity.name.type.rust'},
            2: {name: 'punctuation.brackets.angle.rust'}
          },
          end: '>',
          endCaptures: {0: {name: 'punctuation.brackets.angle.rust'}},
          patterns: [
            {include: '#block-comments'},
            {include: '#comments'},
            {include: '#keywords'},
            {include: '#lvariables'},
            {include: '#lifetimes'},
            {include: '#punctuation'},
            {include: '#types'},
            {include: '#variables'}
          ]
        },
        {
          match: '\\b(bool|char|str)\\b',
          name: 'entity.name.type.primitive.rust'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.trait.rust storage.type.rust'},
            2: {name: 'entity.name.type.trait.rust'}
          },
          match: '\\b(trait)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.struct.rust storage.type.rust'},
            2: {name: 'entity.name.type.struct.rust'}
          },
          match: '\\b(struct)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.enum.rust storage.type.rust'},
            2: {name: 'entity.name.type.enum.rust'}
          },
          match: '\\b(enum)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.type.rust storage.type.rust'},
            2: {name: 'entity.name.type.declaration.rust'}
          },
          match: '\\b(type)\\s+(_?[A-Z][A-Za-z0-9_]*)\\b'
        },
        {
          match: '\\b_?[A-Z][A-Za-z0-9_]*\\b(?!!)',
          name: 'entity.name.type.rust'
        }
      ]
    },
    variables: {
      patterns: [
        {
          match:
            '\\b(?<!(?<!\\.)\\.)(?:r#(?!(crate|[Ss]elf|super)))?[a-z0-9_]+\\b',
          name: 'variable.other.rust'
        }
      ]
    }
  },
  scopeName: 'source.rust'
}

export default grammar
