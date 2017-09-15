package web

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"sync"
)

type (
	// Config defines the config for CasbinAuth middleware.
	Config struct {
		// Skipper defines a function to skip middleware.
		Skipper middleware.Skipper

		// Session store.
		// Required.
		Store sessions.Store
	}
)

const (
	key = "_session_store"
)

var (
	// DefaultConfig is the default Session middleware config.
	DefaultConfig = Config{
		Skipper: middleware.DefaultSkipper,
	}
)

var mu = new(sync.Mutex)

func SessGet(sess *sessions.Session, key string) interface{} {
	mu.Lock()
	defer mu.Unlock()

	return sess.Values[key]
}

func SessSet(c echo.Context, sess *sessions.Session, key string, value interface{}) {
	mu.Lock()
	defer mu.Unlock()

	sess.Values[key] = value
	sess.Save(c.Request(), c.Response())
}

// Get returns a named session.
func Get(name string, c echo.Context) (*sessions.Session, error) {
	store := c.Get(key).(sessions.Store)
	return store.Get(c.Request(), name)
}

// Middleware returns a Session middleware.
func Middleware(store sessions.Store) echo.MiddlewareFunc {
	c := DefaultConfig
	c.Store = store
	return MiddlewareWithConfig(c)
}

// MiddlewareWithConfig returns a Sessions middleware with config.
// See `Middleware()`.
func MiddlewareWithConfig(config Config) echo.MiddlewareFunc {
	// Defaults
	if config.Skipper == nil {
		config.Skipper = DefaultConfig.Skipper
	}
	if config.Store == nil {
		panic("echo: session middleware requires store")
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if config.Skipper(c) {
				return next(c)
			}
			c.Set(key, config.Store)
			return next(c)
		}
	}
}
